export interface data {
  productRequests: {
    id: number;
    title?: string;
    category?: string;
    upvotes?: number;
    status?: string;
    description?: string;
    comments?: {
      id: number;
      content?: string;
      user?: {
        image?: string;
        name?: string;
        username?: string;
      };
    }[];
  }[];
}