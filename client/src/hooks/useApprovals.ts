import { useEffect, useState } from 'react'

import firebase from '../lib/firebase'
import useApplicantApi from './useApplicantFormApi'

export default () => {
  const [tableData, setTableData] = useState([])
  const [isModalOpen, toggleModal] = useState(false)
  const [adminNote, setAdminNote] = useState('')
  const [appId, setAppId] = useState('')
  const db = firebase?.firestore?.()
  const { updateApplication, getApplication } = useApplicantApi()

  useEffect(() => {
    const getData = async () => {
      db.collection('applications')
        .orderBy('lastModified')
        .onSnapshot((querySnapshot) => {
          const data: any = []
          querySnapshot.forEach((doc: any) => {
            const segments: any = doc?.Rm?.key?.path?.segments || []
            data.push({...doc.data(), id: segments[segments.length - 1]})
          })
          setTableData(data)
        })
    }

    if (!tableData?.length) { getData() }
    return () => {
      setAdminNote('')
    } // TODO: unsubscribe on unmount
  }, [tableData])

  const openModal = (rowData: any) => {
    toggleModal(true)
    setAppId(rowData.id)
    setAdminNote(rowData?.applicant?.adminNote??'')
  }

  const handleChange = (event: { target: { value: string }}): void => {
    setAdminNote(event.target.value)
  }

  const handleSubmit = async () => {
    const application = await getApplication(appId)
    const { applicant = {} } = application
    return updateApplication({ ...application, applicant: { ...applicant, adminNote } })
    .then(() => {
      toggleModal(false)
      setAppId('')
      setAdminNote('')
    })
    .catch(console.error)
  }

  return {
    tableData,
    toggleModal,
    isModalOpen,
    adminNote,
    handleChange,
    openModal,
    handleSubmit,
    setAdminNote,
  }
}
