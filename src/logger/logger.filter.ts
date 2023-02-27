import { Injectable, NestMiddleware } from '@nestjs/common';
import { appendFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class LoggerFilter implements NestMiddleware {
  use(req, res, next) {
    res.on('finish', () => {
      const reqLog = `REQ <- URL: ${req.url}, Query params: ${JSON.stringify(
        req.query,
      )}, Body ${JSON.stringify(req.body)}`;
      const resLog = `RES -> Status code: ${res.statusCode}`;
      console.log(reqLog);
      console.log(resLog);
      appendFile(
        join(__dirname, '../../log/all.log'),
        `${reqLog}\n${resLog}\n`,
      );
      if (res.statusCode > 400) {
        appendFile(
          join(__dirname, '../../log/errors.log'),
          `${reqLog}\n${resLog}\n`,
        );
      }
    });
    next();
  }
}
