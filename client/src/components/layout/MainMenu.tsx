import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder"
import DashboardIcon from "@material-ui/icons/Dashboard"
import DateRangeIcon from "@material-ui/icons/DateRange"
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby"
import React from "react"
import { useTranslation } from "react-i18next"

interface ListItemLinkProps {
  to: string
  children: React.ReactElement[]
}

const ListItemLink = (props: ListItemLinkProps) => {
  const { to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<GatsbyLinkProps<{}>, "ref">>(
        (itemProps, _ref) => (
          <GatsbyLink {...itemProps} activeClassName={"Mui-selected"} />
        )
      ),
    [to]
  )

  return <ListItem button={true} component={renderLink} {...props} />
}

export default () => {
  const { t } = useTranslation()
  const menu = [
    {
      label: t("mainMenu.dashboard"),
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      label: t("mainMenu.newClaim"),
      icon: <CreateNewFolderIcon />,
      path: "/application",
    },
    {
      label: t("mainMenu.claimWeek"),
      icon: <DateRangeIcon />,
      path: "/weekly-claims",
    },
    {
      label: t("mainMenu.claimStatus"),
      icon: <CheckBoxIcon />,
      path: "/claim-status",
    },
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
