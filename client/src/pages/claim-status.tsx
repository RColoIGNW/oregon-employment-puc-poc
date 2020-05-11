import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import Grid from '@material-ui/core/Grid'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import useApplicantFormApi from '../hooks/useApplicantFormApi'
import useClaimStatus from '../hooks/useClaimStatus'
import Application from '../models/Application'
import { InputAdornment, Checkbox, FormControlLabel, Fab, useTheme, useMediaQuery, makeStyles, Theme, createStyles, Button, Toolbar, FormControl, Input } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import Claim from '../components/claim/claim'
import ClaimActions from '../components/claim-actions/ClaimActions'


interface MainToolBarProps {
  onSearch: (text: string) => void
  onCreate: () => void
}
const MainToolBar = (props: MainToolBarProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [searchText, setSearchText] = useState('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const handleClearSearch = () => {
    setSearchText('')
  }
  
  const handleCreate = () => {
    props.onCreate && props.onCreate()
  }

  useEffect(() => {
    props.onSearch && props.onSearch(searchText)
  }, [searchText])

  return (
    <Grid container direction={'row'} alignItems={'center'} justify={'space-between'}>
      <Grid item xs={12} md={6} lg={8}>
      <FormControl fullWidth>
        <Input
          id="search-textfield"
          placeholder={'Search'} 
          value={searchText}         
          onChange={handleSearch}
          startAdornment= {
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment= {
            searchText.length > 0 &&
            <InputAdornment position="start">
              <CloseIcon onClick={handleClearSearch}/>
            </InputAdornment>
          }
        />
        </FormControl>       
      </Grid>
      {
        !isMobile &&
        <Grid item>
          <Button 
            variant="outlined" 
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            {'New Application'}
          </Button>
        </Grid>
      }
    </Grid>
    
  )
}
interface SelectedToolBarProps {
  selectedAmount: number
  onClearSelecttion: () => void
  onSearch?: (text: string) => void
  onDiscard?: () => void
  onEdit?: () => void
  onDownload?: () => void
}
const SelectedToolBar = (props: SelectedToolBarProps) => {
  const [checked, setChecked] = React.useState(true);

  const handleClearSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    props.onClearSelecttion && props.onClearSelecttion()
  }
  return (
    <Grid container direction={'row'} justify={'space-between'} alignItems={'center'} spacing={1}>
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox 
              checked={checked} 
              onChange={handleClearSelection} 
              name="selectedApplications" 
              color={'primary'}
            />          
          }
          label={props.selectedAmount}
        />
      </Grid>
      <Grid item>
        <ClaimActions />
      </Grid>
    </Grid>
  )
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      // background: theme.palette.primary.main,
      padding: theme.spacing(2,2),
      //borderBottom: '1px solid',
      //borderBottomColor: theme.palette.primary.main
    },
    createAction: {
      position: 'fixed', 
      bottom: theme.spacing(1),
      right: theme.spacing(1),
      zIndex: 100
    },  
  }),
);

import { AlertProps } from '../components/alerts/Alerts'


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

  const handleSelect = async (applicationId: string, isSelected: boolean) => {
    console.log(selectedList)
    if (isSelected){
      setSelectedList(previousState => [...previousState, applicationId])
    } else {
      setSelectedList(previousState => previousState.filter(a => a !== applicationId))
    }
  }

  const handleClearSelection = () => {
    setSelectedList([])
  }

  const handleCreate = () => {
    navigate('application')
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
          <Toolbar>
          {
            (isMobile && selectedList.length > 0)
            ? <SelectedToolBar  selectedAmount={selectedList.length} onClearSelecttion={handleClearSelection} />
            : <MainToolBar onSearch={setSearchText} onCreate={handleCreate}/>
          }
          </Toolbar>
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
