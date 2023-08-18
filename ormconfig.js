import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { SnakeNamingStrategy } from './src/shared/typeorm/strategies/snake-naming.strategy';

dotenv.config({
    path: `.env`,
});

// Replace \\n with \n to support multiline strings in AWS
for (const envName of Object.keys(process.env)) {
    process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ['src/modules/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
    poolSize: process.env.DB_CONNECTION_LIMIT,
});
