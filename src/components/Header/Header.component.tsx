
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

export const Header = () => {
  return (
    <AppBar position="fixed" sx={{ background: 'black' }}>
      <Toolbar>
        <Link to="/" className={styles.link}>
          <Typography
            variant="h6"
            sx={{
              fontSize: 'bold',
              padding: '10px',
              margin: '10px 100px 10px 20px',
              fontWeight: 'bold',
              position: 'relative',
              border: '5px solid #E98074',
              borderRadius: '15px',
              color: '#ffffff',
            }}
          >
            EazyLearning.
          </Typography>
        </Link>
        <Box>
          <Link to="/" className={styles.menu}>
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
