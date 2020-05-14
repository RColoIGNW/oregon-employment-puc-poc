import React, { useEffect, useState, useContext } from 'react'
import { navigate } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import { Fab, useTheme, useMediaQuery, makeStyles, Theme, createStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import useClaimStatus from '../hooks/useClaimStatus'
import Application from '../models/Application'
import { AlertProps } from '../components/alerts/Alerts'
import ClaimsToolbar from '../components/claims-toolbar/ClaimsToolbar'
import Claim from '../components/claim/claim'
import { SnackBarContext } from '../providers/SnackbarProvider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      padding: theme.spacing(2,2),
    },
    createAction: {
      position: 'fixed', 
      bottom: theme.spacing(1),
      right: theme.spacing(1),
      zIndex: 100
    },  
  }),
);

const ClaimsStatusPage = () => {
  const classes = useStyles()
  const snackbar = useContext(SnackBarContext)
  const { 
    selectedList,
    filterList,
    download, 
    discard, 
    unselectAll,
    select,
    unselect,
    search,
    load, 
  } = useClaimStatus() 

  const [alert, setAlert] = useState<AlertProps>()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  //#region Actions
  const handleCreate = () => {
    navigate('application')
  }

  const handleEdit = (applicationId: string) => {
    navigate('application', { state: { applicationId } })    
  }

  const handleDiscard = async (applicationId: string) => {    
    try {
      await discard(applicationId)
      //TODO: update list
    } catch (error) {
      snackbar.showFeedback({message: 'Unable to discard the application', severity: 'error'})
    } 
  }

  const handleDownload = async (applicationId: string) => {
    try {
      snackbar.showFeedback({ message: 'Download in progress', severity: 'info' })
      const fileURL = await download(applicationId)
      snackbar.showFeedback({ message: 'Download Complete' })
      window.open(fileURL, '_blank')
    } catch (error) {
        
        snackbar.showFeedback({ message: 'Form Download Failed', severity: 'error' })
    }
  }

  const handleSelectedEdit = () => {
    console.log('editing selected applications (edit first app or avoid this action?)')
  }

  const handleSelectedDownload = async () => {
    //TODO: Download all selected claims
    console.log('download selected applications')
  }

  const handleSelectedDiscard = async () => {
    //TODO: Discard all selected claims
    console.log('discard selected applications')
  }

  const handleClearSelection = () => {
    unselectAll()
  }

  const handleSelect = async (applicationId: string, isSelected: boolean) => {    
    if (isSelected){
      select(applicationId)
    } else {
      unselect(applicationId)
    }
  }

  const handleSearch = (text: string) => {
    search(text)
  }
  //#endregion

  //#region Effects 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const amount = await load()
        if (!amount)
          setAlert({ message: 'You have not yet submitted any claims', title: 'Claim Status' })
      } catch (err) {
        setAlert({ message: 'There was an error loading your claims', title: 'Claim Status', severity: 'error' })
      }
    }
    fetchData()
  }, [])  
 //#endregion

  return (
    // <Layout alert={!data?.length && { message:'You have not yet submitted any claims', title: 'Claim Status' }}>
    <Layout>
      <SEO title={'Claim Status'} />  
      {
        isMobile &&  
        <Fab 
          color="primary" 
          aria-label="add" 
          className={classes.createAction}          
          onClick={handleCreate}
        >
          <AddIcon />
        </Fab>  
      }
      <Grid container direction={'column'} spacing={2} style={{ marginTop: '1em' }}>
        <Grid item>     
          <ClaimsToolbar 
            selectedAmount={selectedList.length} 
            onCreate={handleCreate}
            onSearch={handleSearch}
            onEdit={handleSelectedEdit}
            onDiscard={handleSelectedDiscard}
            onDownload={handleSelectedDownload}
            onClearSelection={handleClearSelection}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={1} style={{ marginTop: '1em' }} >
            { filterList.map((application: Application, index: number) =>
              <Grid item key={index} lg={4} md={4} sm={6} xs={12}>
                <Claim 
                  claimId={application.id}                   
                  claimDate={application.submitted || application.lastModified || new Date()} 
                  claimStatus={application.status}
                  isSelected={selectedList.findIndex(a => application.id === a) !== -1}
                  onDownload={handleDownload}
                  onDiscard={handleDiscard}
                  onEdit={handleEdit}
                  onChangeSelect={handleSelect}
                />
              </Grid>
            )}
          </Grid>
        </Grid>          
      </Grid>
    </Layout>
  )
}

export default ClaimsStatusPage
