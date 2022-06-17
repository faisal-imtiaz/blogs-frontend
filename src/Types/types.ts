type blog = {
   id: any,
   title: String,
   content: String,
   userid: String,
   comments: String[]
}

type commentProps = {
    blogId: Number
}


export type {blog, commentProps} ;