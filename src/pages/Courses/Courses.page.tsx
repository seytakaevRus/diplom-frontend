import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { fetchCourses } from '../../store/apis/courses';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AudienceType } from '../../types/courses';

interface CoursesInput {
  audience: AudienceType;
}

export const Courses = memo(() => {
  const dispatch = useAppDispatch();
  const { courseArray } = useAppSelector((state) => state.courses);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CoursesInput>({
    defaultValues: {
      audience: undefined
    },
  });

  const theme = createTheme();

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  };

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          paddingTop: '20px',
        }}
      >
        <FormControl sx={{ width: '500px' }}>
          <InputLabel>Выбрать категорию</InputLabel>
          <Select label="Выбрать категорию">
            <MenuItem>Для детей</MenuItem>
            <MenuItem>Для пользователей старше 16 лет</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {courseArray.map(({ id, audience, title }) => (
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
                <Card sx={{ width: '700px' }}>
                  <CardMedia sx={{ height: '100% ' }} image="" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button sx={{ background: 'black', color: 'white' }}>
                      <Link to={`/courses/${id}`} style={linkStyle}>
                        Перейти к курсу
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      ))}
    </Box>
  );
});
