import { useEffect, useState } from 'react'

import firebase from '../lib/firebase'

export const useFileUpload = (props: { applicationId: string }) => {
  const storageRef = firebase.storage().ref()
  const [allFiles, setFiles] = useState([])
  const [initFiles, setInitFiles] = useState(false)

  const getFiles = async () => {
    const ref: any = storageRef.child(`pua-documents/${localStorage.uid}/${props.applicationId}`)
    const files = await ref.listAll()
    const downloadFiles = files.items.map((file: any) => {
      return storageRef.child(file.location.path).getDownloadURL().then(url => {
        setFiles((files: any) => [...new Set([...files, url]) as any] as any)
        return {
          ...file,
          preview: url,
        }
      })
    })
    return downloadFiles
  }

  useEffect(() => {
    if (!initFiles) {
      getFiles()
      setInitFiles(true)
    }
    return () => {}
  }, [allFiles])

  const removeFile = (fileUrl: string, idx: number) => {
    const path = decodeURIComponent(fileUrl)
      .replace(
        'https://firebasestorage.googleapis.com/v0/b/oregon-pua-poc.appspot.com/o/',
        ''
      )
      .split('?')[0]
    const ref: any = storageRef.child(path)
    ref.delete().then(() => {
      console.info('Deleted a blob or file!')
      delete allFiles[idx];
      setFiles([...(new Set([...allFiles]) as any)] as any)
      return getFiles()
    }).catch(console.error)
  }

  const handleSubmit = (fileObjects: File[]) => {
    fileObjects.forEach((fileObject: File) => {
      const ref: any = storageRef.child(`pua-documents/${localStorage.uid}/${props.applicationId}/${fileObject.name}`)
      const file = new Blob([fileObject])
      const metaData = { contentType: fileObject.type }
      ref.put(file, metaData).then((snapshot: any) => {
        console.info('Uploaded a blob or file!', snapshot)
        return getFiles()
      }).catch(console.error)
    })
  }

  return {
    handleSubmit,
    removeFile,
    getFiles,
    files: allFiles
  }
}

export default useFileUpload
