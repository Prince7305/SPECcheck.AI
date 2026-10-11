import { decrypt } from '../utils/crypto.js';

// Thin wrapper for GitHub REST API calls made on behalf of the logged-in user.
export async function gh(path, user) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${decrypt(user.accessTokenEnc)}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'speccheck-ai',
    },
  });
  if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
  return res.json();
}
