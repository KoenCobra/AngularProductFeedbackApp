export interface productRequest {
  id: number;
  title: string | null;
  category: string | null;
  upvotes: number;
  status: string | null;
  description: string | null;
  userHasUpvoted?: boolean;
  comments?: {
    id : number;
    content: string | null;
    user?: {
      image: string | null;
      name: string | null;
      username: string | null;
    };
    replies?: {
      content: string | null;
      replyingTo: string | null;
      user?: {
        image?: string | null;
        name?: string | null;
        username?: string | null;
      };
    }[];
  }[];
}
