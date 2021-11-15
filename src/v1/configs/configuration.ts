interface IConfig {
  port: number;
  database: {
    uri: string;
  };
}

export default (): IConfig => {
  return {
    port: parseInt(process.env['PORT'], 10) || 5000,
    database: {
      uri: process.env['DATABASE_URI'],
    },
  };
};
