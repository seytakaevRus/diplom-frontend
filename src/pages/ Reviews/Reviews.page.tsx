import React, { memo, useEffect } from 'react';
import {
  Button,
  Box,
  Container,
  Rating,
  Typography,
  Card,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createReview, getReviewsByCourseId } from '../../store/apis/reviews';

import { ReviewsInput } from './Reviews.type';
import { TextField } from '../../components/TextField';

export const Reviews = memo(() => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ReviewsInput>({
    defaultValues: {
      rating: 5,
      review: '',
    },
  });

  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.reviewArray);

  useEffect(() => {
    dispatch(getReviewsByCourseId(id));
  }, []);

  const onSubmit = (data: ReviewsInput) => {
    dispatch(createReview({ ...data, courseId: id }));
  };

  return (
    <Container component="main" fixed>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          width="100%"
          display="grid"
          gap="20px"
        >
          {reviews.length !== 0 ? (
            reviews.map(({ userFullName, id, review, rating }) => (
              <Card variant="outlined" key={id}>
                <Box
                  p={1}
                  display="grid"
                  gridTemplateRows="min-content 1fr"
                  gridTemplateColumns="1fr min-content"
                >
                  <Typography variant="h6" gridColumn="1 / 3">
                    {userFullName}
                  </Typography>
                  <Typography variant="body1">{review}</Typography>
                  <Rating value={rating} readOnly />
                </Box>
              </Card>
            ))
          ) : (
            <Typography variant="h5">
              Отзывов пока нет, будьте первыми
            </Typography>
          )}
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button type="submit" variant="contained" sx={{ pt: 1, pb: 1 }}>
              Отправить
            </Button>
            <Controller
              name="rating"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <Rating
                  onBlur={onBlur}
                  onChange={(event: any) =>
                    onChange(Number(event.target.value))
                  }
                  value={Number(value)}
                  precision={1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              )}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
});
