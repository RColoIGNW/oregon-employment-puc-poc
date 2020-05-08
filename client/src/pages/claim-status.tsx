import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import useApplicantFormApi from '../hooks/useApplicantFormApi'
import useClaimStatus from '../hooks/useClaimStatus'
import Application from '../models/Application'
import { InputAdornment, TextField } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Claim from '../components/claim/claim'


const GoBackToDashboard = () => (
  <Grid item style={{flexDirection:'row', width: '100%', display: 'flex', justifyContent: 'center'}}>
    <Button variant={'contained'} color={'primary'} onClick={() => navigate('/dashboard')}>{`Go to Dashboard`}</Button>
  </Grid>
)

const ClaimsStatusPage = () => {
  const apiClient = useApplicantFormApi()
  const [data, setData] = useState<Application[]>()
  const [searchText, setSearchText] = useState<string>('')
  const [filterList, setFilterList] = useState<Application[]>([])
  const { downloadApplication, discardApplication } = useClaimStatus()
  

  const handleEdit = (applicationId: string) => {
    navigate('application', { state: { applicationId } })
  }

  const handleDiscard = (applicationId: string) => {
    discardApplication(applicationId)
  }

  const handleDownload = async (applicationId: string) => {
    await downloadApplication(applicationId)
  }

  

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiClient.getUserApplications()
      setData(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    data && setFilterList(data)
  }, [data])

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`searching ${event.target.value}`)
    setSearchText(event.target.value)
  }

  useEffect(() => {    
    if (data && filterList){
      const results = data.filter(application =>
        application.id.includes(searchText) || application.status?.includes(searchText)
      )      
      setFilterList(results);
    } 
  }, [searchText])

  

  

  if (!data) return (<div>Loading...</div>)

  return (
    <Layout alert={!data.length && { message:'You have not yet submitted any claims', title: 'Claim Status' }}>
      <SEO title={'Claim Status'} />
      <Grid container direction={'column'} spacing={2} style={{ marginTop: '1em' }} >
        <Grid item>
          <TextField            
            id="search-textfield"
            label="Search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={handleSearchTextChange}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={1} style={{ marginTop: '1em' }}>
          {!filterList.length ? <GoBackToDashboard /> : filterList.map((application: Application, index: number) =>
            <Grid item xs={12} sm={7} md={6} lg={4} key={index}>
              <Claim 
                claimId={application.id} 
                claimDate={application.submitted || application.lastModified || new Date()} 
                claimStatus={application.status}
                onDownload={handleDownload}
                onDiscard={handleDiscard}
                onEdit={handleEdit}
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
