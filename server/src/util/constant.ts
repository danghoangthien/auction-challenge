export const MYSQLDB_USER = process.env.MYSQLDB_USER ?? 'root';
export const MYSQLDB_ROOT_PASSWORD = process.env.MYSQLDB_ROOT_PASSWORD ?? '123456';
export const MYSQLDB_DATABASE = process.env.MYSQLDB_DATABASE ?? 'auction_db';

export const APP_SECRET_KEY = process.env.APP_SECRET_KEY ?? 'APP_SECRET_KEY';
export const APP_AUTH_TOKEN_EXPIRY_IN_HOURS = process.env.APP_AUTH_TOKEN_EXPIRY_IN_HOURS ?? 1;

export const OPENAI_KEY = process.env.OPENAI_KEY ?? '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';
export const OPENAI_API_URL = process.env.OPENAI_API_URL ?? 'https://api.openai.com/v1';