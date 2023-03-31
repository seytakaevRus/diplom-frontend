import { audienceType } from '../constants/audience';

interface ChapterWithLessons {
  id: number;
  title: string;
  position: string;
  lessons: {
    id: number;
    position: string;
    title: string;
  }[];
}

export interface CourseType {
  id: number;
  title: string;
  audience: keyof typeof audienceType;
}

export type CourseInfoType = CourseType & {
  lessonIds: number[];
  chaptersWithLessons: ChapterWithLessons[];
};
