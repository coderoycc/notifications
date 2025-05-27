import { HttpException, HttpStatus, Logger } from '@nestjs/common';


export function apiErrorHandler(
  err: any,
): HttpException {
  if (err instanceof HttpException) {
    return err;
  }

  Logger.error(err, 'API_ERROR_HANDLER');

  return new HttpException({
    message: 'An unexpected error occurred. Please contact support if the problem persists.',
  }, HttpStatus.INTERNAL_SERVER_ERROR);
}