import { Router } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { encrypt } from '../utils/crypto.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Step 1: send user to GitHub. `state` is a random value to prevent CSRF.
router.get('/github', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  res.cookie('oauth_state', state, { httpOnly: true, sameSite: 'lax', maxAge: 10 * 60 * 1000 });
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    scope: 'read:user public_repo', // minimum scopes for MVP
    state,
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
});

// Step 2: GitHub sends the user back with a temporary `code`.
router.get('/github/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    if (!code || !state || state !== req.cookies.oauth_state) {
      return res.status(400).send('Invalid OAuth state');
    }
    res.clearCookie('oauth_state');

    // Exchange code for an access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const { access_token } = await tokenRes.json();
    if (!access_token) return res.status(400).send('GitHub token exchange failed');

    // Fetch profile
    const profile = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${access_token}`, 'User-Agent': 'speccheck-ai' },
    }).then((r) => r.json());

    // Create or update the user (token stored encrypted)
    const user = await User.findOneAndUpdate(
      { githubId: profile.id },
      {
        githubId: profile.id,
        login: profile.login,
        name: profile.name,
        avatarUrl: profile.avatar_url,
        accessTokenEnc: encrypt(access_token),
      },
      { upsert: true, new: true }
    );

    // Our own session: JWT in an httpOnly cookie
    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
    res.redirect(process.env.CLIENT_URL);
  } catch (err) {
    console.error(err);
    res.status(500).send('OAuth failed');
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(null);
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(uid);
    if (!user) return res.json(null);
    const { login, name, avatarUrl } = user;
    res.json({ login, name, avatarUrl });
  } catch {
    res.json(null);
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

export default router;
