import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchCourses } from '../../store/apis/courses';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const Courses = memo(() => {
  const dispatch = useAppDispatch();
  const { courseArray } = useAppSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  // TODO: Добавить разделение на аудиторию.

  return courseArray.map(({ id, audience, title }) => (
    <div key={id}>
      <p>Id: {id}</p>
      <p>Title: {title}</p>
      <p>Audience: {audience}</p>
      <Link to={`/courses/${id}`}>Перейти к курсу</Link>
    </div>
  ));
});
