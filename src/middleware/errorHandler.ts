import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError
} from '@prisma/client/runtime/library';
import AppError from '../utils/AppError';

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
): void => {
  const isProduction = process.env['NODE_ENV'] === 'production';

  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorDetails: any = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Handle Prisma Errors
  if (err instanceof PrismaClientInitializationError) {
    statusCode = 500;
    message = 'Database connection failed.';
    errorDetails = isProduction ? null : err.message;
  }

  if (err instanceof PrismaClientRustPanicError) {
    statusCode = 500;
    message = 'A critical error occurred in Prisma.';
  }

  if (err instanceof PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = 'An unknown error occurred.';
  }

  if (err instanceof PrismaClientValidationError) {
    statusCode = 400;
    message = 'Validation Error: Invalid input.';
  }

  if (err instanceof PrismaClientKnownRequestError) {
    statusCode = 400;
    if (err.meta && typeof err.meta === 'object' && 'target' in err.meta) {
      const target = err.meta['target'] as string[];
      if (err.code === 'P2002') {
        message = `Duplicate value for ${target[0]}`;
      } else if (err.code === 'P2014') {
        message = `Invalid ID: ${target[0]}`;
      } else if (err.code === 'P2003') {
        message = `Invalid input data: ${target[0]}`;
      } else {
        message = `Prisma Error Code: ${err.code}`;
      }
    }
  }

  // Generic Prisma Error Categorization
  if (err.code?.startsWith('P1')) {
    statusCode = 500;
    message = 'Database connection error.';
  } else if (err.code?.startsWith('P2')) {
    statusCode = 400;
    message = 'Invalid field value.';
  } else if (err.code?.startsWith('P5')) {
    statusCode = 429;
    message = 'Too many requests.';
  }

  // Hide detailed errors in production
  res.status(statusCode).json({
    success: false,
    message,
    ...(isProduction ? {} : { error: errorDetails || err.message })
  });
};

export default errorHandler;
