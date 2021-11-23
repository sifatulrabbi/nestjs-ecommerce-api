interface IConfig {
  port: number;
  database: {
    uri: string;
  };
  sessionConfig: typeof sessionConfig;
}

const port = process.env['PORT'];
const uri = process.env['MONGODB_URI'];
const sessionConfig = {
  secret: process.env['SESSION_SECRET'],
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 36000 },
};

export default (): IConfig => {
  return {
    port: port ? parseInt(port, 10) : 5000,
    database: {
      uri: uri ? uri : 'mongodb+srv://localhost:9999/database',
    },
    sessionConfig,
  };
};
