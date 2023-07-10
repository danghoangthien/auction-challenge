import { Request, Response } from 'express';
import { generate } from '../services/AuthToken';

import CheckCredentialService from "../services/Bidder/CheckCredentialService";
import bidderRepository from "../sequelizer/repositories/BidderRepository";

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Failed to login. Invalid credentials.
 */
export const login = async (req: Request , res: Response): Promise<void | Response> => {
  const { email, password } = req.body;
  const checkCredentail = new CheckCredentialService(bidderRepository);
  try {
    const bidder = await checkCredentail.perform(email, password);
    // Set a session variable to indicate the user is logged in
    const token = generate(bidder.bidder_id);

    // Set the token in the response header
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    res.setHeader('Authorization', `Bearer ${token}`);

    // Send a success response
    return res.status(200).json({ message: 'Login successful' });
    // Redirect to the authenticated user's dashboard or another protected route
  } catch (error: any) {
    return res.status(401).json({ message: 'Failed to login', error: 'Invalid credentials' });
  }
}

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out user.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logout successful.
 */
export const logout = (_: Request, res: Response): void | Response => {
  // Clear the authorization header
  res.setHeader('Authorization', '');
  return res.status(200).json({ message: 'Logout successful' });
}