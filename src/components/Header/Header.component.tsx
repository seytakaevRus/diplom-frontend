import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

export const Header = memo(() => {
  return (
    <AppBar position="fixed" sx={{ background: 'black', p: '0 24px' }}>
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
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
          <Box display="flex" gap="15px">
            <Link to="/courses" className={styles.menu}>
              Курсы
            </Link>
            <Link to="/reviews" className={styles.menu}>
              Отзывы
            </Link>
            <Link to="/questions" className={styles.menu}>
              Вопросы
            </Link>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
