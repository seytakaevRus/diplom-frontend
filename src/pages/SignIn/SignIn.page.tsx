import { memo, useEffect } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SignInInput } from './SignIn.type';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser } from '../../store/apis/auth';
import { selectAuthData } from '../../store/slices/auth';

const theme = createTheme();

export const SignInPage = memo(() => {
  const { userInfo, error } = useAppSelector(selectAuthData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>();

  const onSubmit = (data: SignInInput) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  return (
    <ThemeProvider theme={theme}>
      {error && <Alert severity="error">{error}</Alert>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register('email', {
                required: 'Поле не может быть пустым',
                maxLength: {
                  value: 50,
                  message:
                    'Значение поля не может быть больше, чем 50 символов',
                },
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Почта не является валидной',
                },
              })}
              margin="normal"
              fullWidth
              id="email"
              label="Почта"
              autoComplete="email"
              autoFocus
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />
            <TextField
              {...register('password', {
                required: 'Поле не может быть пустым',
                maxLength: {
                  value: 50,
                  message:
                    'Значение поля не может быть больше, чем 50 символов',
                },
              })}
              margin="normal"
              fullWidth
              label="Пароль"
              type="password"
              id="password"
              error={errors.password ? true : false}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, pt: 1, pb: 1 }}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/sign-up">Нет аккаунта? Регистрация</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
});
