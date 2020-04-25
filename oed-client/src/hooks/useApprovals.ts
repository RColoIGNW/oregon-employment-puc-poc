import { useEffect, useState } from 'react'

import useApplicantFormApi from './useApplicantFormApi'

export default () => {
  const [tableData, setTableData] = useState([])
  const { getUnapprovedApplications } = useApplicantFormApi()

  useEffect(() => {
    const getData = async () => {
      const data = await getUnapprovedApplications()
      setTableData(data)
    }

    if (!tableData?.length) { getData() }
    return () => {}
  })

  return {
    tableData,
  }
}
