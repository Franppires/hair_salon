import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface IPayload {
  sub: string;
}

class AuthMiddleware {
  auth(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(401).json({
        code: 'token.missing',
        message: 'Token missing',
      });
    }

    const [, token] = authHeader.split(' ');

    let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN; // senha fica no arq. env
    if (!secretKey) {
      throw new Error('There is no token key');
    }

    try {
      const { sub } = verify(token, secretKey) as IPayload;
      request.user_id = sub;
      return next();
    } catch (error) {
      return response.status(401).json({
        code: 'token.expired',
        message: 'Token expired',
      });
    }
  }
}

export { AuthMiddleware };
