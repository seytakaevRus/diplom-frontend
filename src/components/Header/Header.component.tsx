import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Button, IconButton, Link, MenuItem, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import cl from './Header.module.css';

const Header = () => {
  return (
   <div>
      <AppBar position="fixed" color="primary" className={cl.AppBar}>
        <Container fixed className={cl.container}>
          <Toolbar>
<IconButton edge="start" 
color="inherit" area-aria-label='menu'>
  <MenuIcon/>
</IconButton>
<Typography variant="h6" className={cl.logo}>EazyLearning.</Typography>
<Box mr={3}> 

  </Box>

          </Toolbar>
        </Container>
      </AppBar>
   </div>
  );
};

export default Header;