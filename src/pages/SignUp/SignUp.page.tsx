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

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser } from '../../store/apis/auth';
import { selectAuthData } from '../../store/slices/auth';

import { SignUpInput } from './SignUp.type';

const theme = createTheme();

export const SignUpPage = memo(() => {
  const { userInfo, error } = useAppSelector(selectAuthData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>();

  const onSubmit = (data: SignUpInput) => {
    dispatch(registerUser(data));
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
            Регистрация
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('firstName', {
                    required: 'Поле не может быть пустым',
                    maxLength: {
                      value: 50,
                      message:
                        'Значение поля не может быть больше, чем 50 символов',
                    },
                  })}
                  autoComplete="given-name"
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('lastName', {
                    required: 'Поле не может быть пустым',
                    maxLength: {
                      value: 50,
                      message:
                        'Значение поля не может быть больше, чем 50 символов',
                    },
                  })}
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
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
                  fullWidth
                  id="email"
                  label="Почта"
                  autoComplete="email"
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password', {
                    required: 'Поле не может быть пустым',
                    maxLength: {
                      value: 50,
                      message:
                        'Значение поля не может быть больше, чем 50 символов',
                    },
                  })}
                  fullWidth
                  label="Пароль"
                  type="password"
                  id="password"
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('passwordConfirm', {
                    required: 'Поле не может быть пустым',
                    maxLength: {
                      value: 50,
                      message:
                        'Значение поля не может быть больше, чем 50 символов',
                    },
                  })}
                  fullWidth
                  label="Повторный пароль"
                  type="password"
                  id="passwordConfirm"
                  error={errors.passwordConfirm ? true : false}
                  helperText={errors.passwordConfirm?.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in">Уже имеете аккаунт? Вход</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
});
