import { audienceType } from '../constants/audience';

export interface CourseType {
  id: number;
  title: string;
  audience: keyof typeof audienceType;
}
