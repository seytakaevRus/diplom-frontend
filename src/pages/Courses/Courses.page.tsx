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
        <Box display="flex" flexDirection="column" flexWrap="wrap" gap="20px">
          <Select
            name="audience"
            label="Выбрать категорию"
            items={audienceItems}
            control={control}
            fullWidth
          />
          {courseArray.map(({ id, title }) => (
            <Card key={id}>
              <CardMedia sx={{ height: '100% ' }} image="" component="img" />
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
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
});
