import { useEffect, useState } from 'react'

import firebase from '../lib/firebase'

export default () => {
  const [tableData, setTableData] = useState([])
  const [isModalOpen, toggleModal] = useState(false)
  const db = firebase?.firestore?.()

  useEffect(() => {
    const getData = async () => {
      db.collection("applications")
        .orderBy('lastModified')
        .onSnapshot((querySnapshot) => {
          const data: any = []
          querySnapshot.forEach((doc: any) => {
            const segments: any = doc?.Rm?.key?.path?.segments || []
            data.push({...doc.data(), id: segments[segments.length - 1]})
          })
          setTableData(data.reverse())
        })
    }

    if (!tableData?.length) { getData() }
    return () => {}
  }, [tableData])

  return {
    tableData,
    toggleModal,
    isModalOpen,
  }
}
