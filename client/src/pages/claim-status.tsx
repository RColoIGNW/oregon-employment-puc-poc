import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import Grid from '@material-ui/core/Grid'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import useApplicantFormApi from '../hooks/useApplicantFormApi'
import useClaimStatus from '../hooks/useClaimStatus'
import Application from '../models/Application'
import { Fab, useTheme, useMediaQuery, makeStyles, Theme, createStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { AlertProps } from '../components/alerts/Alerts'
import ClaimsToolbar from '../components/claims-toolbar/ClaimsToolbar'
import Claim from '../components/claim/claim'

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
  const apiClient = useApplicantFormApi()
  const [data, setData] = useState<Application[]>()
  const [searchText, setSearchText] = useState<string>('')
  const [filterList, setFilterList] = useState<Application[]>([])
  const { downloadApplication, discardApplication } = useClaimStatus()
  const [selectedList, setSelectedList] = useState<string[]>([])
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

  const handleDiscard = (applicationId: string) => {    
    discardApplication(applicationId)
    // TODO: Update list
  }

  const handleDownload = async (applicationId: string) => {
    await downloadApplication(applicationId)
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
    setSelectedList([])
  }

  const handleSelect = async (applicationId: string, isSelected: boolean) => {
    console.log(selectedList)
    if (isSelected){
      setSelectedList(previousState => [...previousState, applicationId])
    } else {
      setSelectedList(previousState => previousState.filter(a => a !== applicationId))
    }
  }

  const handleSearch = (text: string) => {
    setSearchText(text)
  }
  //#endregion

  //#region Effects 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getUserApplications()
        setData(data)
        if (!data?.length)
          setAlert({ message: 'You have not yet submitted any claims', title: 'Claim Status' })
      } catch (err) {
        setAlert({ message: 'There was an error loading your claims', title: 'Claim Status', severity: 'error' })
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    data && setFilterList(data)
  }, [data])  

  useEffect(() => {    
    if (data && filterList){
      const results = data.filter(application =>
        application.id.includes(searchText) || application.status?.includes(searchText)
      )      
      setFilterList(results)
      console.log(selectedList)
    } 
  }, [searchText])
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
