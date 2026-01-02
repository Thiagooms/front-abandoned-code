export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    byStatus: (status: string | null) => ['posts', status] as const,
    byId: (id: string) => ['posts', id] as const,
  },
  categories: {
    all: ['categories'] as const,
    byId: (id: string) => ['categories', id] as const,
    bySlug: (slug: string) => ['categories', 'slug', slug] as const,
  },
};
