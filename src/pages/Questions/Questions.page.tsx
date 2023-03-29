import React, { memo, useEffect } from 'react';
import {
    CssBaseline,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    Select,
    List,
    ListItem,
    makeStyles,
    ListSubheader,
    ListItemButton,
    ListItemText,
    Collapse,

} from '@mui/material';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { lightGreen } from '@mui/material/colors';


const theme = createTheme();


export const Questions = memo(() => {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    const handleClick3 = () => {
        setOpen3(!open3);
    };


    return ( 
        <Box>
            <ThemeProvider theme={theme}>
                <Container component="main" sx={{ marginTop: 20 }}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Частозадаваемые вопросы
                        </Typography>

                        <List
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                            component="nav"
                        >
                            <ListItemButton onClick={handleClick}>
                                <ListItemText primary="Где вы находитесь?" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" sx={{ background: 'lightGrey' }} disablePadding subheader={
                                    <ListSubheader component="div" id="nested-list-subheader" >
                                        У нас онлайн-школа с индивидуальными уроками, мы работаем везде, где есть интернет.
                                        Это лучше, чем обычные занятия, потому что:
                                    </ListSubheader>

                                }>
                                    <ListItem sx={{ pl: 4 }}>
                                        <ListItemText primary="- студент не отвлекается на разговоры или игры с другими ребятами" />
                                    </ListItem>
                                    <ListItem sx={{ pl: 4 }}>
                                        <ListItemText primary="- не надо ждать или догонять других студентов, можно учиться со скоростью, которая комфортна
                        именно студенту;" />
                                    </ListItem>
                                    <ListItem sx={{ pl: 4 }}>
                                        <ListItemText primary="- индивидуальное расписание, а если пропустили урок, то продолжаете ровно с того места, где
                        закончили в последний раз." />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItemButton onClick={handleClick2}>
                                <ListItemText primary="Сколько длятся курсы?" />
                                {open2 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open2} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ background: 'lightGrey' }}>
                                    <ListItem sx={{ pl: 4 }}>
                                        <ListItemText primary="- студенты могут заниматься с разной скоростью; " />
                                    </ListItem>
                                    <ListItem sx={{ pl: 4 }}>
                                        <ListItemText primary="- кто-то занимается 1 раз в неделю, кто-то 2, а кто-то 3 раза в неделю;" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItemButton onClick={handleClick3}>
                                <ListItemText primary="Можно ли отменить или перенести урок?" />
                                {open3 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open3} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ background: 'lightGrey' }}>
                                    <ListItem sx={{ pl: 4 }}>
                                        <ListItemText primary="Да. Так как вы сами проходите курс - ограничений по времени нет! " />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </Container>
            </ThemeProvider>
        </Box>
    );
});
