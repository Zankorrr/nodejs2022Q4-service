import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { appendFile } from 'fs/promises';
import { join } from 'path';

@Catch(BadRequestException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    const reqLog = `REQ <- URL: ${
      responseBody.path
    }, Query params: ${JSON.stringify(request.query)}, Body: ${JSON.stringify(
      request.body,
    )}`;
    const resLog = `RES -> Status code: ${httpStatus}`;
    console.log(reqLog);
    console.log(resLog);
    appendFile(
      join(__dirname, '../../log/errors.log'),
      `${reqLog}\n${resLog}\n`,
    );
  }
}
