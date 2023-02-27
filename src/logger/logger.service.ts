import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  // error(message: any, stack?: string, context?: string) {
  // add your tailored logic here
  // super.error(...arguments);
  // }
  queryCustomLog(url, queryParams, body) {
    this.log(`Url: ${url}, Query: ${queryParams}, Body: ${body}`);
  }
  answerCustomLog(body, statusCode) {
    this.log(`ANSWER - Body: ${body}, Code: ${statusCode}`);
  }
}
