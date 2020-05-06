import {createStyles, makeStyles} from '@material-ui/styles'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import useFileUpload from '../../hooks/useFileUpload'
import { UploadFile } from '../../hooks/useFileUpload'

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

export default function Dropzone(props: { applicationId: string }) {
  const classes = useStyles()
  const { handleSubmit, removeFile, files } = useFileUpload({ applicationId: props.applicationId })
  const { getRootProps, getInputProps, isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    multiple: true,
    onDrop: async (acceptedFiles: any) => {
      await handleSubmit([ ...acceptedFiles ])
    }
  })

  const thumbs = files?.map((file: UploadFile, idx: number) => {
    const { name = '' } = file
    return file.imgUrl && (
      <React.Fragment key={`${name}-${idx}`}>
        {name.toLowerCase().includes('.jpg') || name.toLowerCase().includes('.png') || name.toLowerCase().includes('.jpeg') ?
          <div className={classes.thumb}>
            <div className={classes.thumbInner}>
              <img
                src={file.imgUrl}
                className={classes.img}
                alt={name}
              />
            </div>
          </div>
          :
          <span>{name}</span>
        }
        <span style={{ cursor: 'pointer', color: 'red', marginLeft: '4px', marginRight: '1em' }} onClick={() => {
          removeFile(file)
        }}>X</span>
      </React.Fragment>
    )
  })

  return (
    <div className="container">
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject }) as any} style={{cursor: 'pointer'}}>
        <input {...getInputProps() as any} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Container>
      <aside className={classes.thumbsContainer}>
        {thumbs}
      </aside>
    </div>
  )
}
