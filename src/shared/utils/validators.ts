/**
 * Validation utilities for CineFlex
 * Provides type-safe validation functions for forms and user input
 */

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[\d\s\-()]{10,}$/,
  URL: /^https?:\/\/.+/,
  SEARCH_QUERY: /^[a-zA-Z0-9\s\-_.,!?]{1,100}$/,
  MOVIE_TITLE: /^[a-zA-Z0-9\s\-_.,!?()&]{1,200}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
} as const;

// Validation error messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PASSWORD:
    'Password must be at least 8 characters with uppercase, lowercase, and number',
  PHONE: 'Please enter a valid phone number',
  URL: 'Please enter a valid URL',
  SEARCH_QUERY: 'Search query must be between 1 and 100 characters',
  MOVIE_TITLE: 'Movie title must be between 1 and 200 characters',
  USERNAME: 'Username must be 3-20 characters (letters, numbers, _, -)',
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must be no more than ${max} characters`,
  MIN_VALUE: (min: number) => `Must be at least ${min}`,
  MAX_VALUE: (max: number) => `Must be no more than ${max}`,
  INVALID_FORMAT: 'Invalid format',
} as const;

/**
 * Validate if a value is not empty
 */
export function isRequired(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  return VALIDATION_PATTERNS.EMAIL.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): boolean {
  return VALIDATION_PATTERNS.PASSWORD.test(password);
}

/**
 * Validate phone number format
 */
export function validatePhone(phone: string): boolean {
  return VALIDATION_PATTERNS.PHONE.test(phone);
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): boolean {
  return VALIDATION_PATTERNS.URL.test(url);
}

/**
 * Validate search query
 */
export function validateSearchQuery(query: string): boolean {
  return VALIDATION_PATTERNS.SEARCH_QUERY.test(query);
}

/**
 * Validate movie title
 */
export function validateMovieTitle(title: string): boolean {
  return VALIDATION_PATTERNS.MOVIE_TITLE.test(title);
}

/**
 * Validate username format
 */
export function validateUsername(username: string): boolean {
  return VALIDATION_PATTERNS.USERNAME.test(username);
}

/**
 * Validate string length
 */
export function validateLength(
  value: string,
  min?: number,
  max?: number
): boolean {
  if (min !== undefined && value.length < min) {
    return false;
  }
  if (max !== undefined && value.length > max) {
    return false;
  }
  return true;
}

/**
 * Validate number range
 */
export function validateNumberRange(
  value: number,
  min?: number,
  max?: number
): boolean {
  if (min !== undefined && value < min) {
    return false;
  }
  if (max !== undefined && value > max) {
    return false;
  }
  return true;
}

/**
 * Validate date range
 */
export function validateDateRange(
  date: Date,
  minDate?: Date,
  maxDate?: Date
): boolean {
  if (minDate && date < minDate) {
    return false;
  }
  if (maxDate && date > maxDate) {
    return false;
  }
  return true;
}

/**
 * Validate if value is a valid year
 */
export function validateYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 10;
}

/**
 * Validate if value is a valid rating (0-10)
 */
export function validateRating(rating: number): boolean {
  return rating >= 0 && rating <= 10;
}

/**
 * Validate if value is a valid movie ID
 */
export function validateMovieId(id: number): boolean {
  return Number.isInteger(id) && id > 0;
}

/**
 * Validate if value is a valid genre ID
 */
export function validateGenreId(id: number): boolean {
  return Number.isInteger(id) && id > 0;
}

/**
 * Validate form field with multiple rules
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateField(
  value: unknown,
  rules: ValidationRule[]
): ValidationResult {
  for (const rule of rules) {
    // Required check
    if (rule.required && !isRequired(value)) {
      return {
        isValid: false,
        message: rule.message || VALIDATION_MESSAGES.REQUIRED,
      };
    }

    // Skip other validations if value is empty and not required
    if (!isRequired(value)) {
      continue;
    }

    // Type-specific validations
    if (typeof value === 'string') {
      // Length validations
      if (rule.minLength && value.length < rule.minLength) {
        return {
          isValid: false,
          message:
            rule.message || VALIDATION_MESSAGES.MIN_LENGTH(rule.minLength),
        };
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        return {
          isValid: false,
          message:
            rule.message || VALIDATION_MESSAGES.MAX_LENGTH(rule.maxLength),
        };
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value)) {
        return {
          isValid: false,
          message: rule.message || VALIDATION_MESSAGES.INVALID_FORMAT,
        };
      }
    }

    if (typeof value === 'number') {
      // Number range validations
      if (rule.minValue !== undefined && value < rule.minValue) {
        return {
          isValid: false,
          message: rule.message || VALIDATION_MESSAGES.MIN_VALUE(rule.minValue),
        };
      }

      if (rule.maxValue !== undefined && value > rule.maxValue) {
        return {
          isValid: false,
          message: rule.message || VALIDATION_MESSAGES.MAX_VALUE(rule.maxValue),
        };
      }
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      return {
        isValid: false,
        message: rule.message || VALIDATION_MESSAGES.INVALID_FORMAT,
      };
    }
  }

  return { isValid: true };
}

/**
 * Validate entire form object
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateForm(
  data: Record<string, unknown>,
  schema: Record<string, ValidationRule[]>
): FormValidationResult {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(schema)) {
    const result = validateField(data[field], rules);
    if (!result.isValid) {
      errors[field] = result.message || VALIDATION_MESSAGES.INVALID_FORMAT;
      isValid = false;
    }
  }

  return { isValid, errors };
}

/**
 * Common validation schemas
 */
export const VALIDATION_SCHEMAS = {
  SEARCH: {
    query: [
      { required: true, message: 'Search query is required' },
      {
        minLength: 1,
        maxLength: 100,
        message: 'Search query must be 1-100 characters',
      },
    ],
  },
  EMAIL: {
    email: [
      { required: true, message: VALIDATION_MESSAGES.REQUIRED },
      {
        pattern: VALIDATION_PATTERNS.EMAIL,
        message: VALIDATION_MESSAGES.EMAIL,
      },
    ],
  },
  PASSWORD: {
    password: [
      { required: true, message: VALIDATION_MESSAGES.REQUIRED },
      {
        pattern: VALIDATION_PATTERNS.PASSWORD,
        message: VALIDATION_MESSAGES.PASSWORD,
      },
    ],
  },
  USERNAME: {
    username: [
      { required: true, message: VALIDATION_MESSAGES.REQUIRED },
      {
        pattern: VALIDATION_PATTERNS.USERNAME,
        message: VALIDATION_MESSAGES.USERNAME,
      },
    ],
  },
} as const;
