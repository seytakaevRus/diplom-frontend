import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material';
import { memo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import remarkGfm from 'remark-gfm';

import { MarkdownImage } from '../../components/MarkdownImage';
import { fetchCourseById } from '../../store/apis/courses';
import { fetchLessonById } from '../../store/apis/lessons';
import {
  goToCertainLesson,
  goToNextLesson,
  goToPreviousLesson,
} from '../../store/slices/lessons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const drawerWidth = 300;

export const CourseById = memo(() => {
  const { id } = useParams<{ id: string }>();

  const { currentLessonIndex, lessonById } = useAppSelector(
    (state) => state.lessons,
  );
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
    dispatch(goToCertainLesson(id));
  };

  useEffect(() => {
    dispatch(fetchCourseById(id));
  }, []);

  useEffect(() => {
    if (lessonIds.length === 0) return;

    dispatch(fetchLessonById(String(lessonIds[currentLessonIndex])));
  }, [lessonIds, currentLessonIndex]);

  if (!lessonById?.content) return <CircularProgress />;

  const drawer =
    chaptersWithLessons.length !== 0 ? (
      <>
        {chaptersWithLessons.map(
          ({ position, lessons, title, id: chapterId }) => (
            <Box key={chapterId} color="white" p={1}>
              {`${position}. ${title}`}
              {lessons.map(({ position, title, id: lessonId }) => {
                const lessonBoxStyles: {
                  background: string;
                  '&:hover': {
                    background?: string;
                    cursor: string;
                  };
                } = {
                  background: 'none',
                  '&:hover': {
                    background: '#333',
                    cursor: 'pointer',
                  },
                };

                if (lessonId === lessonById.id) {
                  lessonBoxStyles.background = 'rgba(102,204,102,.5)';
                  lessonBoxStyles['&:hover'].background = 'rgba(102,204,102,.5)';
                }

                return (
                  <Box
                    p={1}
                    pr={2}
                    pl={2}
                    sx={lessonBoxStyles}
                    key={lessonId}
                    data-lesson-id={lessonId}
                    onClick={onCertainLesson}
                  >
                    {`${position}. ${title}`}
                  </Box>
                );
              })}
            </Box>
          ),
        )}
      </>
    ) : null;

  return (
    <Box
      pl={5}
      pr={5}
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
        >{`${lessonById.position} ${lessonById.title}`}</Typography>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: MarkdownImage,
          }}
        >
          {lessonById.content}
        </ReactMarkdown>
        <Box display="flex" justifyContent="space-between">
          <IconButton
            disabled={currentLessonIndex === 0}
            onClick={onPreviousLesson}
          >
            <WestIcon />
          </IconButton>
          <IconButton
            disabled={currentLessonIndex === lessonIds.length - 1}
            onClick={onNextLesson}
          >
            <EastIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});
