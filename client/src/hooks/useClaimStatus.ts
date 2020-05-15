import { useEffect, useState } from "react"

import Application from "../models/Application"
import { request } from "../util/request"
import storage from "../util/storage"
import useApplicantFormApi from "./useApplicantFormApi"

export default () => {
  const [data, setData] = useState<Application[]>()
  const [searchText, setSearchText] = useState<string>("")
  const [filterList, setFilterList] = useState<Application[]>([])
  const [selectedList, setSelectedList] = useState<string[]>([])
  const api = useApplicantFormApi()

  const download = async (applicationId: string): Promise<string> => {
    const headers = new Headers()
    headers.append("Content-Type", "application/pdf")
    headers.append("Authorization", `Bearer ${storage.load("token")}`)

    const requestOptions = {
      method: "GET",
      headers,
      redirect: "follow",
    } as any

    try {
      const result = await request(
        `${process.env.REACT_APP_API_HOST}/api/generate-pdf/${applicationId}`,
        requestOptions,
        "blob"
      )
      const file = new Blob([result as Blob], { type: "application/pdf" })
      const fileURL = URL.createObjectURL(file)
      return fileURL
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const discard = async (applicationId: string) => {
    await api.discardApplication(applicationId)
  }

  const unselectAll = () => {
    setSelectedList([])
  }

  const select = (applicationId: string) => {
    setSelectedList((previousState) => [...previousState, applicationId])
  }

  const unselect = (applicationId: string) => {
    setSelectedList((previousState) =>
      previousState.filter((a) => a !== applicationId)
    )
  }

  const search = (text: string) => {
    setSearchText(text)
  }

  const load = async () => {
    try {
      const data = await api.getUserApplications()
      setData(data)
      return data.length
    } catch (error) {
      console.error(`Error loading applications ${error}`)
      throw error
    }
  }

  useEffect(() => {
    data && setFilterList(data)
  }, [data])

  useEffect(() => {
    if (data && filterList) {
      const results = data.filter(
        (application) =>
          application.id.toLowerCase().includes(searchText) ||
          application.status?.toLowerCase().includes(searchText)
      )
      setFilterList(results)
      console.info(selectedList)
    }
  }, [searchText])

  return {
    filterList,
    selectedList,
    download,
    discard,
    unselectAll,
    select,
    unselect,
    search,
    load,
  }
}
