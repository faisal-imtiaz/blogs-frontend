type AuthState = {
  userStatus: string;
  setUserStatus: (userStatus: string) => void;
};

type Blog = {
  id: number;
  title: string;
  content: string;
  user: User;
  name: string;
  comments: Comment[];
};

type Comment = {
  id: number;
  content: string;
  user: User;
  replyCount: string;
};

type Reply = {
  id: number;
  content: string;
  commentid: string;
  user: User;
};

type User = {
  name: string;
};

type CommentProps = {
  blogId: number;
};

type ReplyProps = {
  commentId: number;
};

type ShowReplyProps = {
  commentid: number;
  replyCount: string;
};

export type {
  AuthState,
  Blog,
  Comment,
  Reply,
  CommentProps,
  ReplyProps,
  ShowReplyProps,
};
