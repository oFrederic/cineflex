/**
 * Common types used across the application
 */

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Sort options
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: string;
  direction: SortDirection;
  label: string;
}

// Filter types
export interface FilterOption {
  value: string | number;
  label: string;
  count?: number;
}

export interface FilterGroup {
  name: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

// Modal types
export interface ModalConfig {
  isOpen: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

// Toast notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: FilterOption[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  };
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
  badge?: number;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: Theme;
  language: string;
  notifications: boolean;
  watchlistVisibility: 'public' | 'private';
}

// Search types
export interface SearchParams {
  query: string;
  filters?: Record<string, string | number | boolean>;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

// Cache types
export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Event types
export interface AppEvent {
  type: string;
  payload?: any;
  timestamp: number;
}

// Performance types
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}
