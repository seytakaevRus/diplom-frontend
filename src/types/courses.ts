const audienceType = {
  child: 'child',
  teenager: 'teenager',
} as const;

export type AudienceType = keyof typeof audienceType;

interface ChapterWithLessons {
  id: number;
  title: string;
  lessons: {
    id: number;
    title: string;
  }[];
}

export interface CourseType {
  id: number;
  title: string;
  audience: keyof typeof audienceType;
  slug: string;
  cover: string;
}

export type CourseInfoType = CourseType & {
  lessonIds: number[];
  chaptersWithLessons: ChapterWithLessons[];
};
