// import { Json } from 'lib/database.types';

export type UserInfo = {
  about: string;
  age: number;
  alcohol: string;
  body: string;
  city: string;
  education: string;
  gender: string;
  goals: string[];
  horoscope: string;
  kids: string;
  length: string;
  name: string;
  smoke: string;
  sociotips: string;
};
export type UserPrefrences = {
  about: string;
  alcohol: string[];
  body: string[];
  education: string[];
  gender: string[];
  goals: string[];
  horoscope: string[];
  kids: string[];
  language: string[];
  maxAge: number;
  maxLength: number;
  minAge: number;
  minLength: number;
  smoke: string[];
  sociotips: string[];
};

export type User = {
  id: string;
  created_at: string;
  name: string;
  gender: string;
  age: string;
  interests: string[];
  user: UserInfo;
  search: UserPrefrences;
  avatar_image: { avatar: string; updated_at: string };
  cover_image: { cover: string; updated_at: string };
  sociotype: string;
  has_sociotype: boolean;
  updated_at: string;
  has_avatar: boolean;
  user_images?: string[];
};

export type UserInterests = {
  interests: string[];
};

export type Discussion = {
  author?: {
    name: string;
    age: string;
    avatar: string;
  };
  author_id: string | null;
  comments_count: number | null;
  created_at: string | null;
  id: number;
  last_comment: string | null;
  subtitle: string | null;
  title: string | null;
  updated_at: string | null;
  users_count: number | null;
  views_count: number | null;
};
