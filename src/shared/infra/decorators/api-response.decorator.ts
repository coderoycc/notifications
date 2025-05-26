import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, getSchemaPath, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { get } from 'http';

export const ApiStandardResponse = <TModel extends Type<any>>(
  model: TModel,
  status: number = 200,
  description?: string,
  isArray: boolean = false,
) => {
  const dataSchema = isArray 
    ? {
        type: 'array',
        items: { $ref: getSchemaPath(model)}
      }
    : { $ref: getSchemaPath(model) };
  return applyDecorators(
    ApiExtraModels(model),
    SwaggerApiResponse({
      status,
      description: description || 'Operación exitosa',
      schema: {
        type: 'object',
        properties: {
          data: dataSchema,
          meta: {
            type: 'object',
            properties: {
              timestamp: { type: 'string', format: 'date-time' },
              version: { type: 'string' },
              requestId: { type: 'string' },
              executionTime: { type: 'number' },
            },
          },
        },
      },
    }),
  );
};

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    SwaggerApiResponse({
      status: 200,
      description: 'Lista paginada obtenida exitosamente',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: `#/components/schemas/${model.name}` },
          },
          pagination: {
            type: 'object',
            properties: {
              currentPage: { type: 'number' },
              totalPages: { type: 'number' },
              totalItems: { type: 'number' },
              itemsPerPage: { type: 'number' },
              hasNext: { type: 'boolean' },
              hasPrevious: { type: 'boolean' },
            },
          },
          meta: {
            type: 'object',
            properties: {
              timestamp: { type: 'string', format: 'date-time' },
              version: { type: 'string' },
              requestId: { type: 'string' },
              executionTime: { type: 'number' },
            },
          },
        },
      },
    }),
  );
};