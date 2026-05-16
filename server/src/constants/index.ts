export const LEAD_STATUS = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  LOST: 'Lost',
} as const;

export const LEAD_SOURCE = {
  WEBSITE: 'Website',
  INSTAGRAM: 'Instagram',
  REFERRAL: 'Referral',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  SALES: 'sales',
} as const;

export const API_MESSAGES = {
  // Auth
  REGISTRATION_SUCCESS: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  UNAUTHORIZED: 'Unauthorized access',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_ALREADY_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',

  // Leads
  LEAD_CREATED: 'Lead created successfully',
  LEAD_UPDATED: 'Lead updated successfully',
  LEAD_DELETED: 'Lead deleted successfully',
  LEAD_NOT_FOUND: 'Lead not found',
  LEADS_FETCHED: 'Leads fetched successfully',

  // General
  INTERNAL_ERROR: 'Internal server error',
  BAD_REQUEST: 'Bad request',
  FORBIDDEN: 'Forbidden',
};

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_PAGE: 1,
} as const;

export const JWT_CONFIG = {
  ALGORITHM: 'HS256',
} as const;
