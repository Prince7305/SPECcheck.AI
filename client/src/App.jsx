import { useEffect, useState } from 'react';

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
          setUser(await me.json());
          const r = await fetch('/api/repos');
          if (r.ok) setRepos(await r.json());
          else setError('Could not load repositories');
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

  if (loading) return <p className="p-8 text-slate-500">Loading...</p>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">SPECcheck.AI</h1>
        <p className="text-slate-500">AI-Powered Engineering Intelligence Platform</p>
        {error && <p className="text-red-600">{error}</p>}
        <a href="/api/auth/github" className="px-5 py-2 rounded bg-slate-900 text-white">
          Login with GitHub
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-full" />
          <span className="font-semibold">{user.name || user.login}</span>
        </div>
        <button onClick={logout} className="text-sm text-slate-500 underline">Logout</button>
      </header>
      <h2 className="text-xl font-bold mb-3">Your repositories</h2>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="space-y-2">
        {repos.map((r) => (
          <li key={r.id} className="bg-white border rounded p-3">
            <div className="font-medium">{r.fullName} {r.private && <span className="text-xs text-slate-500">(private)</span>}</div>
            <div className="text-sm text-slate-500">{r.description || 'No description'} {r.language && `· ${r.language}`}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
