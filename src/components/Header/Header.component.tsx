import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

export const Header = () => {
  return (
    <AppBar position="fixed" sx={{ background: 'black' }}>
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          width="100%"
          p="10px 0"
        >
          <Link to="/" className={styles.link}>
            <Typography
              variant="h6"
              sx={{
                fontSize: 'bold',
                padding: '10px',
                fontWeight: 'bold',
                border: '5px solid #E98074',
                borderRadius: '15px',
                color: '#ffffff',
              }}
            >
              EazyLearning.
            </Typography>
          </Link>
          <Link to="/courses" className={styles.menu}>
            Курсы
          </Link>
          <Link to="/reviews" className={styles.menu}>
            Отзывы
          </Link>
          <Link to="/questions" className={styles.menu}>
            Вопросы
          </Link>
          <Link to="/choosing-computer" className={styles.menu}>
            Компьютер для занятий
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
