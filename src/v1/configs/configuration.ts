export default () => ({
  port: parseInt(process.env['PORT'], 10) || 5000,
  database: {
    uri: process.env['DATABASE_URI'],
  },
});
