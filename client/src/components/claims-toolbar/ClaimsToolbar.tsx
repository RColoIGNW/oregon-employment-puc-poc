import React, { FunctionComponent } from 'react'
import { Toolbar, useMediaQuery, useTheme, Grid, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useTranslation } from 'react-i18next'
import Search from '../search'
import ClaimActions from '../claim-actions/ClaimActions'

interface ClaimsToolbarProps {    
  selectedAmount: number
  onSearch: (text: string) => void
  onCreate: () => void
  onClearSelection: () => void    
  onDiscard: () => void
  onEdit: () => void
  onDownload: () => void    
}

const ClaimsToolbar: FunctionComponent<ClaimsToolbarProps> = (props: ClaimsToolbarProps) => {    
  const theme = useTheme()  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Toolbar>
      {
        (isMobile && props.selectedAmount > 0)
        ? <SelectedToolBar  
            selectedAmount={props.selectedAmount} 
            onClearSelecttion={props.onClearSelection}
            onDiscard={props.onDiscard}
            onDownload={props.onDownload}
            onEdit={props.onEdit}  
          />
        : <MainToolBar onSearch={props.onSearch} onCreate={props.onCreate}/>
      }
    </Toolbar>
  )
}


interface MainToolBarProps {
  onSearch: (text: string) => void
  onCreate: () => void
}
const MainToolBar = (props: MainToolBarProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation() 
  
  const handleCreate = () => {
    props.onCreate && props.onCreate()
  }
  return (
    <Grid container direction={'row'} alignItems={'center'} justify={'space-between'}>
      <Grid item xs={12} md={6} lg={8}>
        <Search onSearch={props.onSearch}/>
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
            {t('claims.newApplication')}
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

export default ClaimsToolbar
