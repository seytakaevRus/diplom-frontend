import React, { memo } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Container,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export const Questions = memo(() => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };

  return (
    <Container fixed component="main">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textIndent: '30px',
          gap: '20px',
        }}
      >
        <Typography component="h1" variant="h4">
          Часто задаваемые вопросы
        </Typography>

        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
        >
          <ListItemButton
            onClick={handleClick}
            sx={{
              background: 'rgba(230, 220, 220, 0.2)',
              marginBottom: '10px',
            }}
          >
            <ListItemText primary="Где вы находитесь?" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              subheader={
                <Typography sx={{ paddingBottom: '5px' }}>
                  У нас онлайн-школа с индивидуальными уроками, мы работаем
                  везде, где есть интернет. Это лучше, чем обычные занятия,
                  потому что:
                </Typography>
              }
            >
              <ListItem>
                <ListItemText primary="- студент не отвлекается на разговоры или игры с другими ребятами" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="- не надо ждать или догонять других студентов, можно учиться со скоростью, которая комфортна
                        именно студенту;"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="- индивидуальное расписание, а если пропустили урок, то продолжаете ровно с того места, где
                        закончили в последний раз."
                />
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton
            onClick={handleClick2}
            sx={{
              background: 'rgba(230, 220, 220, 0.2)',
              marginBottom: '10px',
            }}
          >
            <ListItemText primary="Сколько длятся курсы?" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <ListItemText primary="- студенты могут заниматься с разной скоростью; " />
              </ListItem>
              <ListItem>
                <ListItemText primary="- кто-то занимается 1 раз в неделю, кто-то 2, а кто-то 3 раза в неделю;" />
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton
            onClick={handleClick3}
            sx={{
              background: 'rgba(230, 220, 220, 0.2)',
              marginBottom: '10px',
            }}
          >
            <ListItemText primary="Можно ли отменить или перенести урок?" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <ListItemText primary="Да. Так как вы сами проходите курс - ограничений по времени нет! " />
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton
            onClick={handleClick4}
            sx={{
              background: 'rgba(230, 220, 220, 0.2)',
              marginBottom: '10px',
            }}
          >
            <ListItemText primary="Как выбрать компьютер для занятий?" />
            {open4 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open4} timeout="auto" unmountOnExit>
            <Typography variant="h5" sx={{ margin: 5 }}>
              Стационарный компьютер
            </Typography>
            <List>
              <ListItem>- Гибкий выбор комплектующих</ListItem>
              <ListItem>
                - За ту же цену можно получить большую производительность, чем у
                ноутбука
              </ListItem>
              <ListItem>
                - Большой потенциал в дальнейшем улучшении компьютера
              </ListItem>
              <ListItem>
                - Очень маленькая мобильность - такой компьютер не так удобно
                взять с собой в деревню или другой город
              </ListItem>
              <ListItem>
                - Подходит более опытным пользователям, так как стационарный
                компьютер требует правильной установки и настройки, а также
                подключения дополнительных устройств
              </ListItem>
              <ListItem>
                - К стационарному компьютеру как минимум потребуется монитор,
                мышь, клавиатура, наушники
              </ListItem>
            </List>
            <Typography variant="h5" sx={{ margin: 5 }}>
              Ноутбук
            </Typography>
            <List>
              <ListItem>
                - Отличная мобильность - работать и учиться можно в любом месте,
                даже в путешествии
              </ListItem>
              <ListItem>
                - Всё вместе - после приобретения ноутбука, можно его включить и
                сразу начать пользоваться, ничего дополнительно не покупая и не
                подключая.
              </ListItem>
              <ListItem>- Подходит неопытным пользователям</ListItem>
            </List>
            <Typography sx={{ paddingBottom: '5px' }}>
              Из рассмотренных плюсов и минусов можно сделать вывод, что для
              наших целей лучше подходит именно ноутбук. Ведь нам как раз и
              нужно, чтобы можно было очень легко и просто начать заниматься! А
              ещё и из любого места! Даже если летом мы поехали к бабушке в
              деревню. Поэтому неудивительно, что уже многие годы прослеживается
              снижение популярности стационарных компьютеров и рост рынка
              ноутбуков.
            </Typography>
            <Typography sx={{ paddingBottom: '5px' }}>
              Производители ноутбуков (Lenovo, Acer, HP, Asus, Dell) являются
              лишь торговыми марками, которые работают в основном над дизайном,
              маркетингом, комплектацией устройства. При этом сами комплектующие
              - процессор, видеокарту, оперативную память, разные производители
              могут заказывать у одних и тех же компаний. Поэтому если ноутбук
              подходит по характеристикам, можно смело выбирать его, вне
              зависимости от марки. Конечно, тут стоит оговориться: необходимо,
              чтобы эта марка была достаточно известной, так как у малоизвестной
              компании могут попасться комплектующие низкого качества, и будет
              очень обидно, если ноутбук сломается уже на втором уроке.
            </Typography>
            <Typography variant="h5" sx={{ margin: 5 }}>
              Собирательный образ подходящего ноутбука
            </Typography>
            <Typography sx={{ paddingBottom: '5px' }}>
              Размер экрана - <b>15-17 дюймов</b>
              Дисплей - <b>IPS с разрешением 1920*1080 (FullHD) и больше</b>
              Оперативная память - <b>8 ГБ и больше</b>
              Интегрированная видеокарта в комплекте с процессором новых
              поколений Диск - <b>SSD от 256 ГБ и больше</b>
            </Typography>
            <Typography sx={{ paddingBottom: '5px' }}>
              Ура! Теперь мы разобрались в самых важных комплектующих и
              параметрах компьютера и готовы обратиться в магазин, чтобы выбрать
              ноутбук, на котором сможем эффективно и с комфортом заниматься!
            </Typography>
          </Collapse>
        </List>
      </Box>
    </Container>
  );
});
