import { useEffect, useState } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import LoginPage from './components/LoginPage';
import { SpecCheckLogo } from './components/SpecCheckLogo';

export default function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const me = await fetch('/api/auth/me');
        if (me.ok) {
          const data = await me.json();
          if (data) {
            setUser(data);
            const r = await fetch('/api/repos');
            if (r.ok) setRepos(await r.json());
            else setError('Could not load repositories');
          }
        }
      } catch {
        setError('Server not reachable');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setRepos([]);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-muted">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <span className="text-sm font-medium">Loading SPECcheck.AI...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <BackgroundCanvas />
        <LoginPage error={error} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <header className="mb-8 flex items-center justify-between border-b border-line pb-6">
        <SpecCheckLogo size={36} showSubtitle={false} />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={user.avatarUrl} alt="" className="h-9 w-9 rounded-full ring-2 ring-line" />
            <span className="text-sm font-semibold text-ink">{user.name || user.login}</span>
          </div>
          <button
            onClick={logout}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-line/50 hover:text-ink"
          >
            Logout
          </button>
        </div>
      </header>

      <h2 className="mb-3 text-xl font-bold text-ink">Your repositories</h2>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="space-y-2">
        {repos.map((r) => (
          <li key={r.id} className="rounded-lg border border-line bg-surface p-3">
            <div className="font-medium text-ink">
              {r.fullName}{' '}
              {r.private && <span className="text-xs text-muted">(private)</span>}
            </div>
            <div className="text-sm text-muted">
              {r.description || 'No description'} {r.language && `· ${r.language}`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}