import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { fetchCourses } from '../../store/apis/courses';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AudienceType } from '../../types/courses';
import { Select } from '../../components/Select';
import { audienceItems } from '../../constants/audience';

interface CoursesInput {
  audience: AudienceType;
}

export const Courses = memo(() => {
  const dispatch = useAppDispatch();
  const { courseArray } = useAppSelector((state) => state.courses);

  const { control } = useForm<CoursesInput>({
    defaultValues: {
      audience: 'child',
    },
  });

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  };

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return (
    <Box sx={{ paddingTop: 20 }}>
      <Container component="main" maxWidth="md">
        <Box display="grid" gridTemplateRows="min-content min-content" gap="20px">
          <Select
            name="audience"
            label="Выбрать категорию"
            items={audienceItems}
            control={control}
            fullWidth
          />
          <Box  display="grid" gridTemplateColumns="1fr 1fr" gap="20px">
            {courseArray.map(({ id, title, cover }) => (
              <Box key={id} display='grid' gap='10px' gridTemplateRows='1fr 40px 40px'>
                <CardMedia
                  image={cover}
                  component="img"
                  sx={{
                    maxWidth: '100%',
                    height: '100%'
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    sx={{
                      background: 'black',
                      color: 'white',
                      '&:hover': {
                        color: 'black',
                      },
                    }}
                  >
                    <Link to={`/courses/${id}`} style={linkStyle}>
                      Перейти к курсу
                    </Link>
                  </Button>
                </CardActions>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
});
