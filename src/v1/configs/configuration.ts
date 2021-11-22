interface IConfig {
  port: number;
  database: {
    uri: string;
  };
}

const port = process.env['PORT'];
const uri = process.env['MONGODB_URI'];

export default (): IConfig => {
  return {
    port: port ? parseInt(port, 10) : 5000,
    database: {
      uri: uri ? uri : 'mongodb+srv://localhost:9999/database',
    },
  };
};
