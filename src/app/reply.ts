export interface Reply {
  content: string | null;
  replyingTo: string | null;
  user?: {
    image?: string | null;
    name?: string | null;
    username?: string | null;
  };
}

