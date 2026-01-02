export interface CategoryResponse {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  parentName: string | null;
  fullPath: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface CategoryRequest {
  name: string;
  parentId?: number | null;
}

export interface PostResponse {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  viewCount: number;
  featureImage: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  category: CategoryResponse | null;
  createdAt: string;
  updatedAt: string | null;
  publishedAt: string | null;
}

export interface PostRequest {
  title: string;
  content: string;
  categoryId?: number | null;
  featureImage?: string | null;
}

export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
}

export interface CategoryTree extends CategoryResponse {
  children?: CategoryTree[];
}
