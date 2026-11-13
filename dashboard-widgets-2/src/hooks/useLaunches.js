import { useCallback, useEffect, useState } from 'react';
import { fetchLaunches } from '../api/launchLibrary.js';

export default function useLaunches() {
  const [state, setState] = useState({
    status: 'loading', // 'loading' | 'success' | 'error'
    launches: [],
    upcomingTotal: 0,
    error: null,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => ({ ...prev, status: 'loading', error: null }));

    fetchLaunches(controller.signal)
      .then(({ launches, upcomingTotal }) => {
        setState({ status: 'success', launches, upcomingTotal, error: null });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // розмонтування або повторний запит
        setState((prev) => ({ ...prev, status: 'error', error: err.message }));
      });

    return () => controller.abort();
  }, [attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, reload };
}