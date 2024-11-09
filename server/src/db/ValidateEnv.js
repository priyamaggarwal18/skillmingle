import { config } from 'dotenv';
import { cleanEnv, port, str } from 'envalid';
import { resolve } from 'path';
config({ path: resolve('./.env') });

export default cleanEnv(process.env, {
    PORT: port() || 8080,
    FRONTEND_URL: str() || 'http://localhost:3000',
    ACCESS_TOKEN_SECRET: str() || 'secret',
    REFRESH_TOKEN_SECRET: str() || 'secret',
    MONGO_URI: str(),
    CLOUDINARY_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
});
