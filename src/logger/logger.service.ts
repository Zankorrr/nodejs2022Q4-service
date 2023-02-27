import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  log(message: string) {
    console.log(message);
  }
}
