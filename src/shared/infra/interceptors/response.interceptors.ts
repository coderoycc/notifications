import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBuilder } from '../builders/response.builder';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    request.startTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;

        // si tiene el formato
        if (data && (data.meta || data.error)) {
          return data;
        }

        switch (statusCode) {
          case 200:
            return ResponseBuilder.success<T>(data, request);
          case 201:
            return ResponseBuilder.created<T>(data, request);
          case 204:
            return ResponseBuilder.deleted(request);
          default:
            return ResponseBuilder.success<T>(data, request);
        }
      }),
    );
  }
}

