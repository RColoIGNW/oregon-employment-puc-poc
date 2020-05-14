import React from 'react'
import moment from 'moment'

import { 
  Grid, 
  Typography,
  Link,
  Fade,
  Avatar,
  Paper,
  useMediaQuery,
  useTheme,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ClaimActions from '../claim-actions/ClaimActions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    claimBox: {
      padding: theme.spacing(1, 1),
      position: 'relative', 
      margin: theme.spacing(1,1)
    },
    pua: {
      background: theme.palette.primary.dark,
      color: 'white'
    } 
  }),
)

export interface ClaimProps {
  claimId: string
  claimDate?: Date //Receive last modified date or submitted date
  claimStatus?: string  
  isSelected?: boolean
  disableEdit?: boolean
  disableDownload?: boolean
  disableDiscard?: boolean
  onEdit: (applicationId: string) => void
  onDownload: (applicationId: string) => void
  onDiscard: (applicationId: string) => void
  onChangeSelect: (applicationId: string, isSelected: boolean) => void
}

const Claim = (props: ClaimProps) => {  
  const classes = useStyles()
  const { claimId, claimDate, claimStatus } = props
  const [showActions, setShowActions] = React.useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  //#region Actions
  const handleEdit = () => {
    props.onEdit && props.onEdit(claimId)
  }

  const handleDownload = () => {
    props.onDownload && props.onDownload(claimId)
  }

  const handleDiscard = () => {
    props.onDiscard && props.onDiscard(claimId)
  }
  
  const handleChangeSelection = () => {    
    if (isMobile){    
      props.onChangeSelect && props.onChangeSelect(claimId, !props.isSelected)
    }
  }  
  //#endregion
  
  return (
    <>
    <Paper className={classes.claimBox} 
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {
        !isMobile && 
        <Fade in={showActions} timeout={{ enter: 300, exit: 800 }}>               
          <div                                 
            style={
              {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'top',
                justifyContent: 'flex-end',                                
                zIndex: 2,                  
                position: 'absolute',
                right: 0,  
                bottom: 0,      
              }
            }
          >
            <ClaimActions
              onEdit={handleEdit}
              onDownload={handleDownload}
              onDiscard={handleDiscard}
            />
          </div>
        </Fade>
      }
        
        <Grid container 
          direction={'row'} 
          alignItems={'center'}
          style={{ flexWrap: "nowrap" }} 
          spacing={1}>
          <Grid item>
            <Avatar onClick={handleChangeSelection} className={classes.pua}>
              {/* TODO: Put icon peer application type  */}
              { (isMobile && props.isSelected) ? <CheckIcon/> : <ListAltIcon/> }
            </Avatar>
          </Grid>
          <Grid item>
            <Grid container direction={'column'}>
              <Grid item>
                <Link component={'button'} onClick={handleEdit}>
                  <Typography variant={'body1'} color="primary" style={{ fontWeight: 'bold' }}>
                    {claimId}
                  </Typography>    
                </Link>
              </Grid>       
              <Grid item>
                <Typography variant="body2" color="secondary" style={{ fontWeight: 'bold' }}>
                  {claimStatus || 'undefined'} 
                </Typography>
              </Grid>                
              <Grid item>
                <Typography variant="body1">
                  {claimDate && moment(claimDate).format('MMM D, YYYY HH:mm')}
                </Typography>
              </Grid>              
            </Grid>
          </Grid>   
        </Grid>
    </Paper>
    </>
  )
}

export default Claim