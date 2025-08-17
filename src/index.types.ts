// ============================================================================
// CENTRALIZED TYPE DEFINITIONS
// ============================================================================

// Raw menu item format from backend API
export interface MenuItem {
  id: string;
  categoria: string;
  producto: string;
  precio: string;
  descripcion: string;
  img: string;
  stock: string;
  _rowNumber: number;
}

// Processed menu item for display (with cleaner property names and types)
export interface ProcessedMenuItem {
  id: string;
  category: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
  stock: number;
}

// Menu category containing processed items
export interface MenuCategory {
  name: string;
  items: ProcessedMenuItem[];
}

// ============================================================================
// API RELATED TYPES
// ============================================================================

// Generic API response wrapper (if needed in the future)
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// API error response
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// ============================================================================
// HOOK RETURN TYPES
// ============================================================================

// Return type for useMenu hook
export interface UseMenuReturn {
  categories: MenuCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

// Props for MenuDisplay component
export interface MenuDisplayProps {
  className?: string;
  style?: React.CSSProperties;
}

// Props for individual menu item display
export interface MenuItemDisplayProps {
  item: ProcessedMenuItem;
  showImage?: boolean;
  className?: string;
}

// Props for category section
export interface CategorySectionProps {
  category: MenuCategory;
  showImages?: boolean;
  className?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Sort options for menu items
export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'category';

// Filter options
export interface MenuFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  searchTerm?: string;
}
