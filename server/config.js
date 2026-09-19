const mongoUsername = process.env.MONGO_USERNAME || 'admin';
const mongoPassword = process.env.MONGO_PASSWORD || 'admin123';
const mongoHost = process.env.ME_CONFIG_MONGODB_SERVER || 'mongodb';
const mongoPort = process.env.ME_CONFIG_MONGODB_PORT || 27017;

export default {
  mongodb: {
    connectionString: `mongodb://${encodeURIComponent(mongoUsername)}:${encodeURIComponent(mongoPassword)}@${mongoHost}:${mongoPort}/task4_7?authSource=admin`,
    server: mongoHost,
    port: mongoPort,
    database: 'task4_7',
    authDatabase: 'admin',
    authUsername: mongoUsername,
    authPassword: mongoPassword,
  },
  site: {
    host: '0.0.0.0',
    port: 8081,
  },
  basicAuth: {
    username: process.env.MONGO_EXPRESS_USERNAME || 'admin',
    password: process.env.MONGO_EXPRESS_PASSWORD || 'admin123',
  },
};
