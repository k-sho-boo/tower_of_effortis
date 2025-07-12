import { useState, useEffect } from 'react';
import { getTower } from '../utils/indexedDB';
import type { Tower } from '../utils/models';

export const useTower = (towerId: string | undefined) => {
  const [tower, setTower] = useState<Tower | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTower = async () => {
      if (!towerId) {
        setError('Tower ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const towerData = await getTower(parseInt(towerId));
        if (towerData !== undefined) {
          setTower(towerData);
        } else {
          setError('Tower not found');
          setTower(null);
        }
      } catch (err) {
        setError('Failed to load tower');
        console.error('Error fetching tower:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTower();
  }, [towerId]);

  return { tower, isLoading, error };
};