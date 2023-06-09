import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material';
import { memo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import remarkGfm from 'remark-gfm';
import { Container } from '@mui/system';

import { MarkdownMedia } from '../../components/MarkdownMedia';
import { fetchCourseById } from '../../store/apis/courses';
import { fetchLessonById } from '../../store/apis/lesson';
import {
  goToCertainLesson,
  goToNextLesson,
  goToPreviousLesson,
  resetLessonIdsIndex,
} from '../../store/slices/lesson';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDrawerBoxStyles } from '../../utils/getBoxStyles';

const drawerWidth = 300;

export const CourseById = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { lessonIdsIndex, data } = useAppSelector((state) => state.lesson);
  const lessonIds = useAppSelector(
    (state) => state.courses.courseById?.lessonIds || [],
  );
  const chaptersWithLessons = useAppSelector(
    (state) => state.courses.courseById?.chaptersWithLessons || [],
  );

  const dispatch = useAppDispatch();

  const onNextLesson = () => dispatch(goToNextLesson());
  const onPreviousLesson = () => dispatch(goToPreviousLesson());
  const onCertainLesson = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const id = event.currentTarget.getAttribute('data-lesson-id');
    const indexInLessonsArray = lessonIds.findIndex(
      (lessonId) => String(lessonId) === id,
    );

    dispatch(goToCertainLesson(indexInLessonsArray));
  };

  useEffect(() => {
    dispatch(fetchCourseById(id));
    dispatch(resetLessonIdsIndex());
  }, []);

  useEffect(() => {
    if (lessonIds.length === 0) return;

    dispatch(fetchLessonById(String(lessonIds[lessonIdsIndex])));
  }, [lessonIds, lessonIdsIndex]);

  if (!data?.content) return <CircularProgress />;

  const drawer =
    chaptersWithLessons.length !== 0 ? (
      <>
        <Box
          p={1}
          sx={getDrawerBoxStyles(false)}
          onClick={() => navigate('reviews')}
        >
           Отзывы
        </Box>
        {chaptersWithLessons.map(
          ({ lessons, title, id: chapterId }, chapterIndex) => (
            <Box key={chapterId} color="white" p={1}>
              {`${chapterIndex + 1}. ${title}`}
              {lessons.map(({ title, id: lessonId }, lessonIndex) => (
                <Box
                  p={1}
                  pr={3}
                  pl={3}
                  sx={getDrawerBoxStyles(lessonId === data.id)}
                  key={lessonId}
                  data-lesson-id={lessonId}
                  onClick={onCertainLesson}
                >
                  {`${`${chapterIndex + 1}.${lessonIndex + 1}`}. ${title}`}
                </Box>
              ))}
            </Box>
          ),
        )}
        <Box
          p={1}
          sx={getDrawerBoxStyles(false)}
          onClick={() => navigate('test-questions')}
        >
            Тест
        </Box>
      </>
    ) : null;

  return (
    <Container fixed component="main" sx={{
      height: '100%'
    }}>
      <Box
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          maxWidth: '1022px',
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              top: 'auto',
              backgroundColor: 'black',
              height: 'calc(100% - 82px)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
        <Box>
          <Typography
            pt={1}
            variant="h4"
            fontWeight="bold"
          >{`${data.position} ${data.title}`}</Typography>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: MarkdownMedia,
            }}
          >
            {data.content}
          </ReactMarkdown>
          <Box display="flex" justifyContent="space-between">
            <IconButton
              disabled={lessonIdsIndex === 0}
              onClick={onPreviousLesson}
            >
              <WestIcon />
            </IconButton>
            <IconButton
              disabled={lessonIdsIndex === lessonIds.length - 1}
              onClick={onNextLesson}
            >
              <EastIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
});
