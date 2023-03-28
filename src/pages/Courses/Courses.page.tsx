import { memo, useEffect } from 'react';

import { fetchCourses } from '../../store/apis/courses';
import { useAppDispatch } from '../../store/hooks';

export const Courses = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return <p>Курсы</p>;
});
