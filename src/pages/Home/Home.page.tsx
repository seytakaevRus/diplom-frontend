import { memo } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
export const Home = memo(() => {
  return (
    <Container component="main"  >
      <Box
        alignSelf='center'
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',

        }}
      >
        <Typography variant='h4' align='center' sx={{
          padding: "10px", border: '5px solid #E98074',
          borderRadius: '15px', margin: "5px"
        }}>Электронный обучающий курс по программированию</Typography>
        <Card sx={{ width: "100%", alignSelf: 'center', marginTop: "60px", }}>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div" marginBottom={5}>
              EazyLearning.
            </Typography>
            <Typography component="div" marginBottom={5} sx={{ fontWeight: 'bold' }}>
              <DoneIcon />Программирование с нуля для детей и подростков. Курсы подойдут тем, кто делает первые шаги.
            </Typography>
            <Typography component="div"  marginBottom={5} sx={{ fontWeight: 'bold' }} >
              <DoneIcon /> Подойдёт тем, кто уже знаком с устройством компьютера и не боится сложных программ.
            </Typography>
            <Typography component="div" marginBottom={5}  sx={{ fontWeight: 'bold' }} >
              <DoneIcon /> Учимся онлайн.
            </Typography>
          </CardContent>
          <CardActions>
            
          <Link to="/courses">
              Начать обучение
            </Link>
          </CardActions>
        </Card>

      </Box>
    </Container>
  )
});
