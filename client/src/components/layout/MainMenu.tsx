import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddBoxIcon from '@material-ui/icons/AddBox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import React from 'react'

interface ListItemLinkProps {
  to: string;
  children: React.ReactElement[]
}

const ListItemLink = (props: ListItemLinkProps) => {
  const { to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<GatsbyLinkProps<{}>, 'ref'>>((itemProps) => (
        <GatsbyLink {...itemProps} />
      )),
    [to],
  )

  return (
    <ListItem button component={renderLink} {...props} />
  )
}

export default () => {
  const menu = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'New application', icon: <AddBoxIcon />, path: '/application' },
    { label: 'Weekly claims', icon: <DateRangeIcon />, path: '/weekly-claims' },
    { label: 'Claim status', icon: <CheckBoxIcon />, path: '/claim-status' },
  ]

  return (
    <List>
      {menu.map((item, index) => (
        <ListItemLink to={item.path} key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemLink>
      ))}
    </List>
  )
}
