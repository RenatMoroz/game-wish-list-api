export interface CreateItem {
  title: string;
  description: string;
  background: string;
  status?: 'planned' | 'playing' | 'completed';
  rating?: number;
  hoursPlayed?: number;
  categoryId: string;
  userId: string;
}

export interface UpdateItem {
  title?: string;
  description?: string;
  background?: string;
  status?: 'planned' | 'playing' | 'completed';
  rating?: number;
  hoursPlayed?: number;
}

export interface GetItemsParams {
  page?: number;
  perPage?: number;
  title?: string;
  description?: string;
  background?: string;
  status?: 'planned' | 'playing' | 'completed';
  rating?: number;
  hoursPlayed?: number;
  categoryId?: string;
  userId?: string;
}
