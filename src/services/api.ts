import axios from 'axios';
import type { CategoryRequest, CategoryResponse, PostRequest, PostResponse } from '../types/api';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const categoryService = {
  getAll: () => api.get<CategoryResponse[]>('/categories').then(res => res.data),

  getById: (id: number) => api.get<CategoryResponse>(`/categories/${id}`).then(res => res.data),

  getByPath: (path: string) => api.get<CategoryResponse>(`/categories/${path}`).then(res => res.data),

  create: (data: CategoryRequest) => api.post<CategoryResponse>('/categories', data).then(res => res.data),

  update: (id: number, data: CategoryRequest) => api.put<CategoryResponse>(`/categories/${id}`, data).then(res => res.data),

  delete: (id: number) => api.delete(`/categories/${id}`),
};

export const postService = {
  getAll: () => api.get<PostResponse[]>('/posts').then(res => res.data),

  getById: (id: number) => api.get<PostResponse>(`/posts/${id}`).then(res => res.data),

  create: (data: PostRequest) => api.post<PostResponse>('/posts', data).then(res => res.data),

  update: (id: number, data: PostRequest) => api.put<PostResponse>(`/posts/${id}`, data).then(res => res.data),

  publish: (id: number) => api.post<PostResponse>(`/posts/${id}/publish`).then(res => res.data),

  delete: (id: number) => api.delete(`/posts/${id}`),
};

export default api;
