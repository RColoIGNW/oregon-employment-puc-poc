import { useEffect, useState } from 'react'

import firebase from '../lib/firebase'

export type UploadFile = {
  path: string
  name: string
  imgUrl: string
}
export interface FileUploadProps {
  files: UploadFile[]
  removeFile: (file: UploadFile) => any
  getFiles: () => any
  handleSubmit: (fileObjects: File[]) => any
}

export const useFileUpload = (props: { applicationId: string }): FileUploadProps => {
  const storageRef = firebase.storage().ref()
  const [files, setFiles] = useState([] as UploadFile[])
  const [initFiles, setInitFiles] = useState(false)

  const getFiles = async () => {
    const ref: any = storageRef.child(`pua-documents/${localStorage.uid}/${props.applicationId}`)
    const newFiles: any = []
    const dbFiles = await ref.listAll()
    const downloadFiles = dbFiles.items.map((file: any) => {
      return storageRef.child(file.location.path).getDownloadURL().then(url => {
        const split = decodeURIComponent(file.location.path).split('/')
        const name = split[split.length - 1]
        const mappedFile = { path: file.location.path, imgUrl: url, name, preview: url }
        newFiles.push(mappedFile)
        return mappedFile
      })
      .catch(console.error)
    })
    const resolvedFiles = await Promise.all(downloadFiles)
    setFiles(resolvedFiles as UploadFile[])
    return resolvedFiles
  }

  useEffect(() => {
    getFiles()
    setInitFiles(true)
    return () => {}
  }, [initFiles])

  const removeFile = (file: UploadFile) => {
    const ref: any = storageRef.child(file.path)
    ref.delete()
      .then(async () => {
        console.info('Deleted a blob or file!')
        await getFiles()
        setInitFiles(false)
      })
      .catch(console.error)
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
    files
  }
}

export default useFileUpload
