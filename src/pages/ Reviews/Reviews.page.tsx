import React, { memo } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  FormHelperText,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Controller, useForm } from 'react-hook-form';

interface ReviewsInput {
  course: string;
  rating: number;
  review: string;
}

const theme = createTheme();

export const Reviews = memo(() => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ReviewsInput>({
    defaultValues: {
      course: '',
      rating: 5,
      review: '',
    },
  });

  const onSubmit = (data: ReviewsInput) => {
    console.log(data);
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ marginTop: 20 }}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4">
              Добавить отзыв о курсе
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box sx={{ minWidth: 520 }}>
                <FormControl fullWidth error={errors.course ? true : false}>
                  <InputLabel>Выбрать курс</InputLabel>
                  <Controller
                    name="course"
                    control={control}
                    rules={{
                      required: 'Поле не может быть пустым',
                    }}
                    render={({ field }) => (
                      <>
                        <Select {...field} label="Выбрать курс">
                          {/* TODO: Добавить динамические данные */}
                          <MenuItem value="Scratch">Scratch</MenuItem>
                          <MenuItem value="Roblox">Roblox</MenuItem>
                          <MenuItem value="Web/HTML">Web/HTML</MenuItem>
                          <MenuItem value="Python">Python</MenuItem>
                        </Select>
                        <FormHelperText>
                          {errors.course?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </FormControl>
              </Box>
              <Box>
                <Controller
                  name="review"
                  control={control}
                  rules={{
                    required: 'Поле не может быть пустым',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      fullWidth
                      placeholder="Пожалуйста введите ваш текст"
                      multiline
                      error={errors.review ? true : false}
                      helperText={errors.review?.message}
                    />
                  )}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>Установите рейтинг курса:</Typography>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <Rating
                      onBlur={onBlur}
                      onChange={onChange}
                      value={Number(value)}
                      precision={1}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  )}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, pt: 1, pb: 1 }}
                fullWidth
              >
                Отправить
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
});
