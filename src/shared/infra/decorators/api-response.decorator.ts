import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, getSchemaPath, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { get } from 'http';
import { PaginationInfo } from 'src/shared/interfaces/api.response.interface';

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
  const dataSchema = {
    type: 'array',
    items: { $ref: getSchemaPath(model)}
  };
  const paginationSchema = {
    $ref: getSchemaPath(PaginationInfo),
  }
  return applyDecorators(
    ApiExtraModels(model),
    ApiExtraModels(PaginationInfo),
    SwaggerApiResponse({
      status: 200,
      description: 'Lista paginada obtenida exitosamente',
      schema: {
        type: 'object',
        properties: {
          data: dataSchema,
          pagination: paginationSchema,
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