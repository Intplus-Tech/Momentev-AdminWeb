export interface Review {
  _id: string;
  vendorId: string;
  bookingId: string;
  reviewerUserId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment?: string;
  isEdited: boolean;
  isFlagged: boolean;
  createdAt: string;
}

export interface AdminReviewQueryParams {
  page?: number;
  limit?: number;
  vendorId?: string;
  reviewerUserId?: string;
  isFlagged?: boolean;
  minRating?: number;
  maxRating?: number;
}

export interface PaginatedReviewsResponse {
  data: Review[];
  total: number;
  page: number;
  limit: number;
}

export default Review;
