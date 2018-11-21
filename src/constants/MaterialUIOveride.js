const override = {
  MuiCheckbox: {
    checked: {
      color: '#DF5A3E !important'
    }
  },
  MuiAppBar: {
    colorPrimary: {
      backgroundColor: '#182a41',
    },
  },
  MuiTab: {
    label: {
      fontSize: '1.143em !important',
    },
    root: {
      textTransform: 'none',
      minWidth: '0 !important',
      margin: '0 25px'
    },
    labelContainer: {
      display: 'inline',
      padding: '20px 0px !important',
      fontFamily: 'maison_neuemedium'
    },
  },
  MuiTabs: {
    root: {
      backgroundColor: '#FFFFFF'
    },
    indicator: {
      backgroundColor: '#DF5A3E',
      height: 3
    }
  },
  MuiPaper: {
    elevation1: {
      boxShadow: 'none'
    }
  },
  MuiInput: {
    underline: {
      '&:after': {
        display: 'none'
      },
      '&:before': {
        display: 'none'
      }
    }
  }
};
export default override;
