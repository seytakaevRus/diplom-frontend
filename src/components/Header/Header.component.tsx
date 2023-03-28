import { LineStyle, Padding } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
const linkStyle = {
  textDecoration: "none",
};
const MenuStyle = {
  textDecoration: "none",
  color:"white",
  paddingRight:"50px",
  fontSize:"bold",
  fontWeight:"bold"
}

const Header = () => {
 

  return (

    <AppBar position="fixed" sx={{ background: 'black' }}>
      <Toolbar>
        <Link to="/" style={linkStyle}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "bold",
              padding: "10px",
              margin:"10px 100px 10px 20px",
              fontWeight: "bold",
              position: "relative",
              border: "5px solid #E98074",
              borderRadius: "15px",
              color: "#ffffff"
            }}>
            EazyLearning.
          </Typography>
        </Link>
        <Box>
        <Link to="/" style={MenuStyle}>Курсы</Link>
        <Link to="/reviews" style={MenuStyle}>Отзывы</Link>
        <Link to="/" style={MenuStyle}>Вопросы</Link>
        <Link to="/" style={MenuStyle}> Компьютер для занятий</Link>

     
        </Box>
      </Toolbar>
    </AppBar>

  );
      };

export default Header;