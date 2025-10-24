/**
 * Security Utilities
 * Provides security-related functions for the frontend application
 */

/**
 * Sanitize HTML to prevent XSS attackss
 * Removes potentially dangerous HTML tags and attributes
 */
export const sanitizeHTML = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Philippine format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+63|0)?9\d{9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

/**
 * Sanitize user input to prevent injection attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Generate a secure random token
 */
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Validate URL to prevent open redirect vulnerabilities
 */
export const isValidURL = (url: string): boolean => {
  try {
    const parsedURL = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(parsedURL.protocol);
  } catch {
    return false;
  }
};

/**
 * Check if URL is from same origin (prevent CSRF)
 */
export const isSameOrigin = (url: string): boolean => {
  try {
    const parsedURL = new URL(url);
    return parsedURL.origin === window.location.origin;
  } catch {
    return false;
  }
};

/**
 * Encode data for safe URL usage
 */
export const encodeForURL = (data: string): string => {
  return encodeURIComponent(data);
};

/**
 * Decode URL-encoded data safely
 */
export const decodeFromURL = (data: string): string => {
  try {
    return decodeURIComponent(data);
  } catch {
    return data;
  }
};

/**
 * Password strength checker
 */
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Password should be at least 8 characters long');
  }

  if (password.length >= 12) {
    score += 1;
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include lowercase letters');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include uppercase letters');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include numbers');
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include special characters');
  }

  return { score, feedback };
};

/**
 * Prevent clickjacking by checking if page is in iframe
 */
export const preventClickjacking = (): void => {
  if (window.self !== window.top) {
    // Page is in an iframe - break out of it
    window.top!.location.href = window.self.location.href;
  }
};

/**
 * Secure localStorage wrapper with encryption simulation
 */
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      // In production, encrypt the value before storing
      const encoded = btoa(value); // Basic encoding (use proper encryption in production)
      localStorage.setItem(key, encoded);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  },

  getItem: (key: string): string | null => {
    try {
      const encoded = localStorage.getItem(key);
      if (!encoded) return null;
      return atob(encoded); // Decode (use proper decryption in production)
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};

/**
 * Rate limiting helper for preventing brute force attacks
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Filter out old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }

  getRemainingAttempts(identifier: string): number {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxAttempts - recentAttempts.length);
  }
}

/**
 * CSRF Token management
 */
export const csrfToken = {
  generate: (): string => {
    const token = generateSecureToken(32);
    sessionStorage.setItem('csrf_token', token);
    return token;
  },

  get: (): string | null => {
    return sessionStorage.getItem('csrf_token');
  },

  validate: (token: string): boolean => {
    const storedToken = sessionStorage.getItem('csrf_token');
    return storedToken === token;
  },

  clear: (): void => {
    sessionStorage.removeItem('csrf_token');
  },
};

/**
 * Secure headers for fetch requests
 */
export const getSecureHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  };

  const csrfTokenValue = csrfToken.get();
  if (csrfTokenValue) {
    headers['X-CSRF-Token'] = csrfTokenValue;
  }

  return headers;
};

/**
 * Detect and prevent common XSS patterns
 */
export const detectXSS = (input: string): boolean => {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /eval\(/gi,
    /expression\(/gi,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
};

/**
 * Session timeout handler
 */
export class SessionManager {
  private timeoutId: NodeJS.Timeout | null = null;
  private warningTimeoutId: NodeJS.Timeout | null = null;
  private sessionDuration: number;
  private warningTime: number;
  private onTimeout: () => void;
  private onWarning: () => void;

  constructor(
    sessionDuration: number = 30 * 60 * 1000, // 30 minutes
    warningTime: number = 5 * 60 * 1000, // 5 minutes before timeout
    onTimeout: () => void = () => {},
    onWarning: () => void = () => {}
  ) {
    this.sessionDuration = sessionDuration;
    this.warningTime = warningTime;
    this.onTimeout = onTimeout;
    this.onWarning = onWarning;
  }

  start(): void {
    this.reset();
    this.setupActivityListeners();
  }

  reset(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.warningTimeoutId) clearTimeout(this.warningTimeoutId);

    this.warningTimeoutId = setTimeout(() => {
      this.onWarning();
    }, this.sessionDuration - this.warningTime);

    this.timeoutId = setTimeout(() => {
      this.onTimeout();
      this.cleanup();
    }, this.sessionDuration);
  }

  private setupActivityListeners(): void {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, () => this.reset(), { passive: true });
    });
  }

  cleanup(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.warningTimeoutId) clearTimeout(this.warningTimeoutId);
  }
}

/**
 * Input validation helpers
 */
export const validators = {
  isAlphanumeric: (str: string): boolean => /^[a-zA-Z0-9]+$/.test(str),
  isNumeric: (str: string): boolean => /^[0-9]+$/.test(str),
  isAlpha: (str: string): boolean => /^[a-zA-Z]+$/.test(str),
  hasMinLength: (str: string, min: number): boolean => str.length >= min,
  hasMaxLength: (str: string, max: number): boolean => str.length <= max,
  isInRange: (num: number, min: number, max: number): boolean => num >= min && num <= max,
};
