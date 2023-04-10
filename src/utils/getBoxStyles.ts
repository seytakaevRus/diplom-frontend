const drawerBoxStyles = {
  '&:hover': {
    background: '#333',
    cursor: 'pointer',
  },
};

const drawerBoxStylesSelected = {
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
