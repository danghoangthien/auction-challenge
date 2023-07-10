import jwt, { Secret } from 'jsonwebtoken';
import { APP_SECRET_KEY, APP_AUTH_TOKEN_EXPIRY_IN_HOURS } from './../../util/constant';

export const generate = (userId: number): string => {
  // Set the token payload with the relevant user information
  const payload = { userId };

  // Generate a JWT token with the payload and a secret key
  const secretKey: Secret = APP_SECRET_KEY;
  const token = jwt.sign(payload, secretKey, { expiresIn: `${APP_AUTH_TOKEN_EXPIRY_IN_HOURS}h` });

  return token;
};

export const verify = (token: string): any => {
  // Verify the token using the secret key and get the decoded payload
  const secretKey: Secret = APP_SECRET_KEY;
  const decoded = jwt.verify(token, secretKey) as any;

  return decoded;
};
