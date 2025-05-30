import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ExceptionCodes } from '@noti-domain/exceptions/exception-codes';
import { NotificationError } from '@noti-domain/exceptions/notification.exceptions';


export function apiErrorHandler(
  err: any,
): HttpException {
  if (err instanceof HttpException) {
    return err;
  } else if (err instanceof NotificationError) {
    const exception = err as NotificationError;
    let status = HttpStatus.BAD_REQUEST;
    const exceptionResponse = exception.message || 'An error occurred';
    switch (exception.code) {
      case ExceptionCodes.NOT_FOUND:
        status = HttpStatus.NOT_FOUND;
        break;
      case ExceptionCodes.VALIDATION_ERROR:
      case ExceptionCodes.INVALID_INPUT:
        status = HttpStatus.BAD_REQUEST;
        break;
      case ExceptionCodes.PERMISSION_DENIED:
        status = HttpStatus.FORBIDDEN;
        break;
      case ExceptionCodes.RESOURCE_EXHAUSTED:
        status = HttpStatus.TOO_MANY_REQUESTS;
        break;
      case ExceptionCodes.OPERATION_FAILED:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      default:
        break;
    }
    return new HttpException({
      message: exceptionResponse,
    }, status);
  }

  Logger.error(err, 'API_ERROR_HANDLER');

  return new HttpException({
    message: 'An unexpected error occurred. Please contact support if the problem persists.',
  }, HttpStatus.INTERNAL_SERVER_ERROR);
}