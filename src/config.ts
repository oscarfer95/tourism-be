import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    corsOrigins: process.env.corsOrigins,
    port: process.env.port,
    feUrl: process.env.feUrl,
    env: process.env.NODE_ENV
  };
});