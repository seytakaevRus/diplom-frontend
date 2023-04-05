import { memo, useEffect } from 'react';
import {
  Button,
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
import { TextField } from '../../components/TextField';

const theme = createTheme();

export const SignUpPage = memo(() => {
  const { userInfo, error } = useAppSelector(selectAuthData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      'email': '',
      password: '',
      passwordConfirm: '',
    }
  });

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
            <TextField
              rules={{
                required: 'Поле не может быть пустым',
                maxLength: {
                  value: 50,
                  message:
                    'Значение поля не может быть больше, чем 50 символов',
                },
              }}
              label="Имя"
              name="firstName"
              control={control}
              isError={errors.firstName ? true : false}
              errorMessage={errors.firstName?.message}
            />
            <TextField
              rules={{
                required: 'Поле не может быть пустым',
                maxLength: {
                  value: 50,
                  message:
                    'Значение поля не может быть больше, чем 50 символов',
                },
              }}
              name="lastName"
              label="Фамилия"
              control={control}
              isError={errors.lastName ? true : false}
              errorMessage={errors.lastName?.message}
            />
            <TextField
              rules={{
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
              }}
              name="email"
              label="Почта"
              control={control}
              isError={errors.email ? true : false}
              errorMessage={errors.email?.message}
            />
            <TextField
              rules={{
                required: 'Поле не может быть пустым',
                maxLength: {
                  value: 50,
                  message:
                    'Значение поля не может быть больше, чем 50 символов',
                },
              }}
              label="Пароль"
              type='password'
              name="password"
              control={control}
              isError={errors.password ? true : false}
              errorMessage={errors.password?.message}
            />
            <TextField
              rules={{
                required: 'Поле не может быть пустым',
                maxLength: {
                  value: 50,
                  message:
                    'Значение поля не может быть больше, чем 50 символов',
                },
              }}
              control={control}
              label="Повторный пароль"
              type="password"
              name="passwordConfirm"
              isError={errors.passwordConfirm ? true : false}
              errorMessage={errors.passwordConfirm?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, pt: 1, pb: 1 }}
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
