import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      // Always pass ZodError to error handler middleware
      // Zod.parse() always throws ZodError, so this should always be true
      if (error instanceof z.ZodError) {
        return next(error);
      }
      // Fallback: if somehow it's not a ZodError, pass it as-is
      next(error);
    }
  };
};
