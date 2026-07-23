import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`🚀 API démarrée sur http://localhost:${env.PORT} (${env.NODE_ENV})`);
  console.log(`   Health check : http://localhost:${env.PORT}/api/health`);
});
