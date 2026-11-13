import { useCallback, useEffect, useState } from 'react';

// fetcher має бути стабільною функцією (визначена поза компонентом).
export default function useFetch(fetcher, params) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);
  const key = JSON.stringify(params);

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher(JSON.parse(key), controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return; // зміна параметрів або розмонтування
        setState({ data: null, loading: false, error: err.message });
      });

    return () => controller.abort();
  }, [fetcher, key, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, reload };
}