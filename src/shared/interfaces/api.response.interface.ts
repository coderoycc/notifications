import { ApiProperty } from '@nestjs/swagger';

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

export class PaginationInfo {
  @ApiProperty({ example: 1, description: 'Página actual' })
  currentPage: number;

  @ApiProperty({ example: 10, description: 'Total de páginas' })
  totalPages: number;

  @ApiProperty({ example: 100, description: 'Total de elementos' })
  totalItems: number;

  @ApiProperty({ example: 10, description: 'Elementos por página' })
  itemsPerPage: number;

  @ApiProperty({ example: true, required: false, description: '¿Hay página siguiente?' })
  hasNext?: boolean;

  @ApiProperty({ example: false, required: false, description: '¿Hay página anterior?' })
  hasPrevious?: boolean;
}