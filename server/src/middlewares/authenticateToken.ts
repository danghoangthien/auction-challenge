import { Request, Response, NextFunction } from 'express';
import { verify } from './../services/AuthToken';

export interface AuthenticatedRequest extends Request {
  user?: any; // Adjust the type of 'user' according to your user object structure
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token (e.g., using a JWT library)
  try {
    const decoded = verify(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check token expiration
    const tokenExpiration = decoded.exp * 1000; // Convert expiration time to milliseconds
    const currentTimestamp = Date.now();

    if (currentTimestamp > tokenExpiration) {
      return res.status(401).json({ message: 'Token expired' });
    }

    // Attach the decoded token or relevant information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authenticateToken
