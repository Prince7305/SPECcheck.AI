import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protects routes: reads JWT from the httpOnly cookie and loads the user.
export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Not logged in' });
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(uid);
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid session' });
  }
}
