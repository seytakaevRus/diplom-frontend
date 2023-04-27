const drawerBoxStyles = {
  color: 'white',
  '&:hover': {
    background: '#333',
    cursor: 'pointer',
  },
};

const drawerBoxStylesSelected = {
  color: 'white',
  background: 'rgba(102,204,102,.5)',
  '&:hover': {
    background: 'rgba(102,204,102,.5)',
    cursor: 'pointer',
  },
};

export const getDrawerBoxStyles = (isSelected: boolean) => {
  if (isSelected) {
    return drawerBoxStylesSelected;
  }

  return drawerBoxStyles;
};
