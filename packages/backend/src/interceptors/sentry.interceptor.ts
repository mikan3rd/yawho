import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import * as Sentry from "@sentry/node";
import { tap } from "rxjs/operators";

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap(null, (exception) => {
        Sentry.captureException(exception);
      }),
    );
  }
}
