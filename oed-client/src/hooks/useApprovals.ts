import { useEffect, useState } from 'react'

import firebase from '../lib/firebase'
import useApplicantFormApi from './useApplicantFormApi'

const useSignIn = () => { // fake for demo
  useEffect(() => {
    const signInAsAdmin = (): any => {
      firebase.auth().signInWithEmailAndPassword('admin@ignw.test.com', 'Testing123!')
        .then(async () => {
          localStorage.setItem(
            'token',
            await firebase?.auth()?.currentUser?.getIdToken()
              .catch(console.error) || ''
          )
        })
        .catch(console.error)
    }
    signInAsAdmin()
    return () => {}
  })
}

export default () => {
  useSignIn() // auto sign in as admin user

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
