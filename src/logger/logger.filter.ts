import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerFilter implements NestMiddleware {
  use(req, res, next) {
    res.on('finish', () => {
      console.log(
        `REQ <- URL: ${req.url}, Query params: ${JSON.stringify(
          req.query,
        )}, Body ${JSON.stringify(req.body)}`,
      );
      console.log(`RES -> Status code: ${res.statusCode}`);
    });
    next();
  }
}
