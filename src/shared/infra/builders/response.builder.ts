import { Request } from 'express';
import { ApiResponse, PaginatedResponse } from '../../interfaces/api.response.interface';
import { ValidationError } from '@nestjs/common';

export class ResponseBuilder {

  /**
   * Generates a unique request ID string.
   * @returns {string} The generated request ID.
   */
  private static generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Calculates the execution time of a request in milliseconds.
   * @param {Request} [request] - The Express request object.
   * @returns {number | undefined} The execution time or undefined if not available.
   */
  private static getExecutionTime(request?: Request): number | undefined {
    if (request && request['startTime']) {
      return Date.now() - request['startTime'];
    }
    return undefined;
  }


  /**
   * Builds a standard API success response.
   * @template T
   * @param {T} data - The response data.
   * @param {Request} [request] - The Express request object.
   * @returns {ApiResponse<T>} The formatted API response.
   */
  static success<T>(data: T, request?: Request): ApiResponse<T> {
    return {
      data,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0',
        requestId: request?.headers['x-request-id'] as string || this.generateRequestId(),
        executionTime: this.getExecutionTime(request),
      },
    };
  }

  /**
   * Builds a paginated API response.
   * @template T
   * @param {T[]} items - The paginated items.
   * @param {number} total - The total number of items.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @param {Request} [request] - The Express request object.
   * @returns {PaginatedResponse<T>} The formatted paginated response.
   */
  static paginated<T>(
    items: T[],
    total: number,
    page: number,
    limit: number,
    request?: Request,
  ): PaginatedResponse<T> {
    const totalPages = Math.ceil(total / limit);

    return {
      data: items,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0',
        requestId: request?.headers['x-request-id'] as string || this.generateRequestId(),
        executionTime: this.getExecutionTime(request),
      },
    };
  }

  /**
   * Builds a standard API created response.
   * @template T
   * @param {T} data - The created resource data.
   * @param {Request} [request] - The Express request object.
   * @returns {ApiResponse<T>} The formatted API response.
   */
  static created<T>(data: T, request?: Request): ApiResponse<T> {
    return {
      data,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0',
        requestId: request?.headers['x-request-id'] as string || this.generateRequestId(),
        executionTime: this.getExecutionTime(request),
      },
    };
  }

  /**
   * Builds a standard API updated response.
   * @template T
   * @param {T} data - The updated resource data.
   * @param {Request} [request] - The Express request object.
   * @returns {ApiResponse<T>} The formatted API response.
   */
  static updated<T>(data: T, request?: Request): ApiResponse<T> {
    return {
      data,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0',
        requestId: request?.headers['x-request-id'] as string || this.generateRequestId(),
        executionTime: this.getExecutionTime(request),
      },
    };
  }

  /**
   * Builds a standard API deleted response with no content.
   * @param {Request} [request] - The Express request object.
   * @returns {ApiResponse<null>} The formatted API response.
   */
  static deleted(request?: Request): ApiResponse<null> {
    return {
      data: null,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0',
        requestId: request?.headers['x-request-id'] as string || this.generateRequestId(),
        executionTime: this.getExecutionTime(request),
      },
    };
  }

  /**
   * Builds a standard API error response.
   * @param {string} code - The error code.
   * @param {string} message - The error message.
   * @param {string[]} [details] - Optional validation error details.
   * @param {Request} [request] - The Express request object.
   * @returns {ApiResponse<null>} The formatted API error response.
   */
  static error(
    code: string,
    message: string,
    details?: string[],
    request?: Request,
  ): ApiResponse<null> {
    return {
      data: null,
      error: {
        code,
        message,
        details, 
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0',
        requestId: request?.headers['x-request-id'] as string || this.generateRequestId(),
        executionTime: this.getExecutionTime(request),
      },
    };
  }

  /**
   * Builds a standard API validation error response.
   * @param {ValidationError[]} errors - The validation errors.
   * @param {Request} [request] - The Express request object.
   * @returns {ApiResponse<null>} The formatted API error response.
   */
  static validationError(
    errors: string[],
    request?: Request,
  ): ApiResponse<null> {
    return this.error(
      'VALIDATION_ERROR',
      'Los datos proporcionados no son válidos',
      errors,
      request,
    );
  }

  /**
   * Builds a standard API not found error response.
   * @param {string} resource - The resource that was not found.
   * @param {Request} [request] - The Express request object.
   * @returns {ApiResponse<null>} The formatted API error response.
   */
  static notFound(resource: string, request?: Request): ApiResponse<null> {
    return this.error(
      'NOT_FOUND',
      `${resource} no encontrado`,
      undefined,
      request,
    );
  }

  /**
   * Builds a standard API conflict error response.
   * @param {string} message - The conflict error message.
   * @param {Request} [request] - The Express request object.
   * @returns {ApiResponse<null>} The formatted API error response.
   */
  static conflict(message: string, request?: Request): ApiResponse<null> {
    return this.error(
      'CONFLICT',
      message,
      undefined,
      request,
    );
  }

  /**
   * Builds a standard API internal server error response.
   * @param {Request} [request] - The Express request object.
   * @returns {ApiResponse<null>} The formatted API error response.
   */
  static internalServerError(request?: Request): ApiResponse<null> {
    return this.error(
      'INTERNAL_SERVER_ERROR',
      'Ha ocurrido un error interno del servidor',
      undefined,
      request,
    );
  }
}