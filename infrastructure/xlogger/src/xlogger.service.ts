import { Injectable, LoggerService } from '@nestjs/common';
import * as moment from 'moment';
import * as WinstonDailyRotateFile from 'winston-daily-rotate-file';
import winston, { format, loggers, transports } from 'winston';

@Injectable()
export class XloggerService implements LoggerService {
  private logFormat: any;

  constructor() {
    this.logFormat = format.combine(
      format.colorize(),

      format.timestamp({
        format: this.timezone,
      }),
      format.align(),
      format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
    );

    this.initiate();
    this.createLoggerConsole();
  }

  timezone(): any {
    const now = moment();
    const utcTime = now.utcOffset(
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
    const date = utcTime.format('YYYY-MM-DD HH:mm:ss');
    return date;
  }

  private createLoggerConsole(): void {
    const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
    loggers.get('bespoke').add(
      new transports.Console({
        format: this.logFormat,
        level: level,
      }),
    );
  }

  private initiate(): void {
    loggers.add('bespoke', {
      format: this.logFormat,
      exitOnError: false,
      transports: [
        new WinstonDailyRotateFile({
          filename: './logs/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'info',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '10d',
        }),
        new WinstonDailyRotateFile({
          filename: './logs/debug-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'debug',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '10d',
        }),
        // new WinstonDailyRotateFile({
        //   filename: './logs/log-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   level: 'log',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '10d',
        // }),
        // new WinstonDailyRotateFile({
        //   filename: './logs/verbose-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   level: 'verbose',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '10d',
        // }),
        new WinstonDailyRotateFile({
          filename: './logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '20d',
        }),
      ],
    });
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, { optionalParams });
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, { optionalParams });
  }
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, { optionalParams });
  }
  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, { optionalParams });
  }
  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message, { optionalParams });
  }

  public get logger(): winston.Logger {
    return loggers.get('bespoke');
  }
}
