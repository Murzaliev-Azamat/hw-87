export interface OneNewsMutation {
  author: ObjectId;
  title: string;
  description: string;
  image: string | null;
  date: Date;
}

export interface CommentMutation {
  author: ObjectId;
  oneNews: ObjectId;
  message: string;
}

export interface AlbumMutation {
  artist: string;
  name: string;
  image: string | null;
  year: number;
}

export interface TrackMutation {
  album: string;
  name: string;
  time: string;
  trackNumber: number;
  linkToYoutube?: string;
}

export interface TrackHistoryMutation {
  user: ObjectId;
  track: string;
  datetime: Date;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
}