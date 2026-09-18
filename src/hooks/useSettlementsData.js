import { useState, useEffect } from 'react';

export function useSettlementsData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const [settlementsRes, churchesRes, peasantRes] = await Promise.all([
          fetch('/data/settlements.json'),
          fetch('/data/churches.json'),
          fetch('/data/peasant-settlements.json'),
        ]);

        if (!settlementsRes.ok || !churchesRes.ok || !peasantRes.ok) {
          throw new Error('Ошибка загрузки данных');
        }

        const [settlements, churches, peasantSettlements] = await Promise.all([
          settlementsRes.json(),
          churchesRes.json(),
          peasantRes.json(),
        ]);

        if (!cancelled) {
          setData({ settlements, churches, peasantSettlements });
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}