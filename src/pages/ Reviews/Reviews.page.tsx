import React, { memo, useEffect } from 'react';
import {
  Button,
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

import { TextField } from '../../components/TextField';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCourses } from '../../store/apis/courses';

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

  const { courseArray } = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

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
                          {courseArray.map(({id, title}) => 
                             <MenuItem key={id} value={title}>{title}</MenuItem>
                          )}
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
                <TextField
                  name="review"
                  control={control}
                  isError={errors.review ? true : false}
                  errorMessage={errors.review?.message}
                  multiline
                  label="Отзыв"
                  rules={{
                    required: 'Поле не может быть пустым',
                  }}
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
