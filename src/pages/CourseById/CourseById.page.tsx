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

const drawerWidth = 300;

export const CourseById = memo(() => {
  const { id } = useParams<{ id: string }>();

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

                if (lessonId === data.id) {
                  lessonBoxStyles.background = 'rgba(102,204,102,.5)';
                  lessonBoxStyles['&:hover'].background =
                    'rgba(102,204,102,.5)';
                }

                return (
                  <Box
                    p={1}
                    pr={3}
                    pl={3}
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
  );
});
