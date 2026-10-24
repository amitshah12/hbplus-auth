import { createRequestHandler } from 'expo-server/adapter/netlify';

export default createRequestHandler({
  build: `${process.cwd()}/dist/server`,
});
