import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { gh } from '../services/github.js';

const router = Router();

// Lists the logged-in user's repositories (first 30, latest updated)
router.get('/', requireAuth, async (req, res) => {
  try {
    const data = await gh('/user/repos?sort=updated&per_page=30&affiliation=owner,collaborator', req.user);
    res.json(
      data.map((r) => ({
        id: r.id,
        fullName: r.full_name,
        private: r.private,
        language: r.language,
        description: r.description,
        updatedAt: r.updated_at,
      }))
    );
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

export default router;
