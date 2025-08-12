import { useState, useEffect } from 'react';
import { MenuService } from '../services';
import type { MenuCategory, UseMenuReturn } from '../index.types';

// Simplified custom hook for menu data - read-only for QR access
export const useMenu = (): UseMenuReturn => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories with items
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await MenuService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el menú');
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};
