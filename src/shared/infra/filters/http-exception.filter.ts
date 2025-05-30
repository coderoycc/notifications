import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseBuilder } from '../builders/response.builder';
import { NotificationError } from '@noti-domain/exceptions/notification.exceptions';
import { ExceptionCodes } from '@noti-domain/exceptions/exception-codes';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let errorResponse: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        const details = Array.isArray(exceptionResponse.message) ? exceptionResponse.message : [exceptionResponse.message || 'Invalid property request'];
        switch (status) {
          case HttpStatus.BAD_REQUEST:
            errorResponse = ResponseBuilder.validationError(details || [], request);
            break;
          case HttpStatus.NOT_FOUND:
            errorResponse = ResponseBuilder.notFound(request, details);
            break;
          case HttpStatus.CONFLICT:
            errorResponse = ResponseBuilder.conflict(
              typeof exceptionResponse === 'string' ? exceptionResponse : exception.message,
              request,
            );
            break;
          case HttpStatus.FORBIDDEN:
            errorResponse = ResponseBuilder.forbidden(
              typeof exceptionResponse === 'string' ? exceptionResponse : exception.message,
              request,
              details,
            );
            break;
          case HttpStatus.TOO_MANY_REQUESTS:
            errorResponse = ResponseBuilder.forbidden(
              exception.message,
              request,
              details,
            );
            break;
          default:
            errorResponse = ResponseBuilder.error(
              `HTTP_${status}`,
              exception.message,
              details,
              request,
            );
        }
      } else {
        errorResponse = ResponseBuilder.error(
          `HTTP_${status}`,
          exception.message,
          undefined,
          request,
        );
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse = ResponseBuilder.internalServerError(request);
    }

    response.status(status).json(errorResponse);
  }
}