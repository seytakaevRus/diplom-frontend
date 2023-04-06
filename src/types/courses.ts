const audienceType = {
  child: 'child',
  teenager: 'teenager',
} as const;

export type AudienceType = keyof typeof audienceType;

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
