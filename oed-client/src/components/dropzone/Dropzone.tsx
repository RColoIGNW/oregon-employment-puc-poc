import {createStyles, makeStyles} from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import useFileUpload from '../../hooks/useFileUpload'

const useStyles = makeStyles(() =>
  createStyles({
    thumbsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16
    },
    thumb: {
      display: 'inline-flex',
      borderRadius: 2,
      border: '1px solid #eaeaea',
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: 'border-box'
    },
    thumbInner: {
      display: 'flex',
      minWidth: 0,
      overflow: 'hidden',
      justifyContent: 'center'
    },
    img: {
      display: 'block',
      width: 'auto',
      height: '100%'
    }
  }),
)

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#eeeeee'
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`

export default function Dropzone() {
  const classes = useStyles()
  const [ files ] = useState([] as any)
  const [ fileObjects, setFileObjects ] = useState([] as any)
  const { handleSubmit, removeFile, files: allFiles } = useFileUpload()
  const { getRootProps, getInputProps, isDragActive,
    isDragAccept,
    isDragReject } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles: any) => {
      setFileObjects([...fileObjects, ...acceptedFiles])
      handleSubmit([ ...fileObjects, ...acceptedFiles ])
    }
  })

  const thumbs = [...new Set(allFiles) as any]?.map((file: string, idx: number) => {
    return file && (
      <React.Fragment key={`${file}-${idx}`}>
        <div className={classes.thumb}>
          <div className={classes.thumbInner}>
            <img
              src={file}
              className={classes.img}
            />
          </div>
        </div>
        <span style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
          removeFile(file, idx)
          // delete allFiles[idx]
          // setFiles(allFiles)
          // setFileObjects(allFiles)
        }}>X</span>
      </React.Fragment>
    )
  })

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: any) => URL.revokeObjectURL(file.preview))
  }, [ files ])

  return (
    <div className="container">
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject }) as any}>
        <input {...getInputProps() as any} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Container>
      <aside className={classes.thumbsContainer}>
        {thumbs}
      </aside>
    </div>
  )
}
