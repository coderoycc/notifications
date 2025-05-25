export interface ApiResponse<T = any> {
  data?: T;
  error?: ErrorDetail;
  meta: MetaInfo;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: PaginationInfo;
  meta: MetaInfo;
}

export interface ErrorDetail {
  code: string;
  message: string;
  details?: string[];
}

export interface MetaInfo {
  timestamp: string;
  version: string;
  requestId: string;
  executionTime?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}