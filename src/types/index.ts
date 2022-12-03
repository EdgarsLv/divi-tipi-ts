export type MetaInfo = {
  name: string;
  age: string;
  gender: string;
};

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
  confirmed_sociotype: boolean;
  user_images?: { [key: number]: { images: string[] } };
};

export type SeenUser = {
  created_at: string;
  is_seen: boolean;
  seen_user: {
    age: string;
    name: string;
    sociotype: string;
    confirmed_sociotype: boolean;
    avatar_image: { avatar: string; updated_at: string };
  };
  seen_user_id: string;
};

export type FilterWithPagin = {
  start: number;
  end: number;
  id?: string;
  minAge: number;
  maxAge: number;
  gender: string[];
  sociotypes: string[];
  foto: boolean;
};

export type FilterForm = {
  minAge: number;
  maxAge: number;
  gender: string[];
  sociotypes: string[];
  foto: boolean;
};

export type UserInterests = {
  interests: string[];
};

export type Relations = {
  id: string;
  views: number;
  caption: string;
  short: string;
};

export type Personality = {
  id: string;
  views: number;
  caption: string;
  image: string;
};

export type Conversation = {
  id: number;
  isSeen: boolean;
  lastMessage: string;
  updated_at: string;
  senderId: string;
  user: {
    name: string;
    age?: string;
    userId?: string;
    avatar_image?: { avatar: string; updated_at: string };
  };
  isDeleted: boolean;
};

export type Message = {
  conversation_id: number;
  created_at: string;
  id: number;
  is_seen: boolean;
  message: string;
  receiver_id: string;
  sender_id: string;
};

export type SendMessage = {
  sender_id: string;
  receiver_id?: string;
  message: string;
  conversation_id: number;
};

export type Participants = {
  discussion_id: number;
  seen: boolean;
  seen_at: string;
  updated_at: string;
  user_id: string;
};

export type Discussion = {
  author?: {
    name: string;
    age: string;
    avatar_image: { avatar: string; updated_at: string };
  };
  author_id: string | null;
  comments_count: number | null;
  created_at: string;
  id: number;
  last_comment: string | null;
  subtitle: string | null;
  title: string | null;
  updated_at: string;
  users_count: number | null;
  views_count: number | null;
  isSeen?: boolean;
  participants: Participants[];
};

export type Comment = {
  author: { name: string; age: string; avatar_image: { avatar: string; updated_at: string } };
  id: number;
  created_at: string;
  text: string | null;
  author_id: string | null;
  discussion_id: number | null;
  replies?: Comment[];
  reply_to?: number;
};

export type CommentContent = {
  text: string;
  reply_to?: number;
  discussion_id: string;
  author_id: string;
};
export type CommentAuthor = {
  age: string;
  name: string;
  avatar_image?: {
    avatar: string;
    updated_at: string;
  };
};

export type PersonalityTestQuestions = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q12: string;
  q14: string;
  q15: string;
  q16: string;
  q17: string;
  q18: string;
  q19: string;
  q20: string;
  q21: string;
  q22: string;
};
