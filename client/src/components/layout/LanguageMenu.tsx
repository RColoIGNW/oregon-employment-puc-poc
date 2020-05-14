import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useTranslation } from "react-i18next"
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarButton: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 'small',
      },
    },
  }),
);

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

export default () => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { i18n } = useTranslation()
  let initialLanguage = languages.findIndex(lang => lang.code === i18n.language)
  initialLanguage = initialLanguage === -1 ? 0 : initialLanguage
  const [selectedIndex, setSelectedIndex] = React.useState(initialLanguage);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (_event: React.MouseEvent<HTMLElement>, index: number) => {
    i18n.changeLanguage(languages[index].code)
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        startIcon={<LanguageIcon />}
        onClick={handleClickListItem}
        color="inherit"
        size={isMobile ? 'small' : undefined}
        className={classes.toolbarButton}
      >
        {isMobile ? languages[selectedIndex].code : languages[selectedIndex].label}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((option, index) => (
          <MenuItem
            key={option.code}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
