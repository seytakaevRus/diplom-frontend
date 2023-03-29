import React, { memo, useEffect } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Rating,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

import { useAppSelector } from '../../store/hooks';
import { selectAuthData } from '../../store/slices/auth';

const theme = createTheme();

const labels: { [index: string]: string } = {
  1: 'Бесполезный',
  2: 'Пойдет',
  3: 'Ok',
  4: 'Хорошо',
  5: 'Отлично',
};

const getLabelText = (value: number) => {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export const Reviews = memo(() => {
  const { userInfo, error } = useAppSelector(selectAuthData);
  const navigate = useNavigate();
  
  const [course, setCourse] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);
  };

  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        {error && <Alert severity="error">{error}</Alert>}
        <Container component="main" maxWidth="xs" sx={{ marginTop: 20 }}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Добавить отзыв о курсе
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Box sx={{ minWidth: 520 }}>
                <FormControl fullWidth>
                  <InputLabel>Выбрать курс</InputLabel>
                  <Select
                    value={course}
                    label="Выбрать курс"
                    onChange={handleChange}
                  >
                    {/* TODO: Добавить динамические данные */}
                    <MenuItem value={1}>Scratch</MenuItem>
                    <MenuItem value={2}>Roblox</MenuItem>
                    <MenuItem value={3}>Web/HTML</MenuItem>
                    <MenuItem value={3}>Python</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <TextField
                  margin="normal"
                  fullWidth
                  placeholder="Пожалуйста введите ваш текст"
                  multiline
                />
              </Box>
              <Box
                sx={{
                  width: 200,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ marginRight: 10 }}>
                  Установите рейтинг курса:
                </Typography>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={1}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
              </Box>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Отправить
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
});
