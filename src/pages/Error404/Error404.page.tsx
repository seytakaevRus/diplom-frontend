import { memo } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

export const Error404Page = memo(() => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center">
          <Grid>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              Страница, которую вы ищете, не существует
            </Typography>
            <Button variant="contained">
              <Link
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
                to="/"
              >
                Вернуться домой
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
});
