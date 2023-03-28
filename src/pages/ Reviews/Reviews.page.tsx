import React, { memo, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
  TextareaAutosize,
  Rating,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import StarIcon from '@mui/icons-material/Star';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser } from '../../store/apis/auth';
import { selectAuthData } from '../../store/slices/auth';
import Header from '../../components/Header/Header.component';

const theme = createTheme();

export const Reviews = memo(() => {
  const { userInfo, error } = useAppSelector(selectAuthData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [course, setCourse] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);}
    const labels: { [index: string]: string } = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
      };
      
      function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }
      const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);
  

  return (
<Box>
<Header/>
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
            Добавить отзыв о курсе
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel >Выбрать курс</InputLabel>
        <Select
          value={course}
          label="Выбрать курс"
          onChange={handleChange}
        >
          <MenuItem value={10}>Scratch</MenuItem>
          <MenuItem value={20}>Roblox</MenuItem>
          <MenuItem value={30}>Web/HTML</MenuItem>
          <MenuItem value={30}>Python</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box >
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
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
