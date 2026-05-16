export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value || defaultValue || '';
};

const defaultCorsOrigin =
  process.env.NODE_ENV === 'production'
    ? 'https://gigflow-dashboard-tau.vercel.app'
    : 'http://localhost:5173';

export const config = {
  port: parseInt(getEnvVar('PORT', '5000'), 10),
  nodeEnv: getEnvVar('NODE_ENV', 'development'),
  mongodbUri: getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/gigflow'),
  jwtSecret: getEnvVar('JWT_SECRET', 'your_super_secret_jwt_key'),
  jwtExpire: getEnvVar('JWT_EXPIRE', '7d'),
  bcryptRounds: parseInt(getEnvVar('BCRYPT_ROUNDS', '10'), 10),
  corsOrigin: getEnvVar('CORS_ORIGIN', defaultCorsOrigin),
};
