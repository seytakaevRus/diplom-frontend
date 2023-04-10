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
          <Link to="/courses" className={styles.logo}>
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
          <Box display="flex" sx={{
            gap: {
              xs: '20px',
              lg: '100px'
            }
          }}>
            <Link to="/courses" className={styles.link}>
              Курсы
            </Link>
            <Link to="/questions" className={styles.link}>
              Вопросы
            </Link>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
