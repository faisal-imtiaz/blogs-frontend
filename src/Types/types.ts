type Blog = {
  id: any;
  title: string;
  content: string;
  userid: string;
  author: string;
  comments: String[];
};

type CommentProps = {
  blogId: Number;
};

export type { Blog, CommentProps };
