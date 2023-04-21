import { ConsoleLogger, Injectable } from '@nestjs/common';
import safeStringify from 'fast-safe-stringify';

const colorMessage = (colorNumber: string) => (message: string) =>
  `\u001b[${colorNumber}m${message}\u001b[0m`;
const colors = {
  black: colorMessage('30'),
  red: colorMessage('31'),
  green: colorMessage('32'),
  yellow: colorMessage('33'),
  blue: colorMessage('34'),
  magenta: colorMessage('35'),
  cyan: colorMessage('36'),
  white: colorMessage('37'),
  skyBlue: colorMessage('96'),
} as const;

@Injectable()
export class MyLogger extends ConsoleLogger {
  constructor() {
    super();
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any): void {
    super.log(this.generateMessage(message, colors.green));
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any): void {
    super.error(
      this.generateMessage(this.convertErrorToString(message), colors.red),
    );
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any): void {
    super.warn(
      this.generateMessage(this.convertErrorToString(message), colors.yellow),
    );
  }

  // エラーオブジェクトの場合はStringに変換する
  private convertErrorToString(message: any): string | any {
    return message instanceof Error
      ? safeStringify({ stack: message.stack, object: message })
      : message;
  }

  // 標準出力するメッセージを生成する
  private generateMessage(
    message: string,
    messageColor = colors.green,
  ): string {
    let logMessage = `- ${colors.magenta(`${new Date()}`)}`; // 日本時間をログを出力する
    logMessage += ` ${messageColor(message)}`;

    return logMessage;
  }
}
