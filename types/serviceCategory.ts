export interface ServiceCategory {
  _id: string;
  name: string;
  icon: string;
  suggestedTags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedServiceCategories {
  data: ServiceCategory[];
  total: number;
  page: number;
  limit: number;
}



