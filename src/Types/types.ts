type Blog = {
  id: any;
  title: string;
  content: string;
  user: User;
  name: string;
  comments: String[];
};

type User = {
  name: string;
};

type CommentProps = {
  blogId: string;
};

export type { Blog, CommentProps };
