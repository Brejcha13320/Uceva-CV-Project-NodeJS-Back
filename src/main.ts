import { envs } from "./infrastructure/config/envs";
import { AppRoutes } from "./infrastructure/web/routes/routes";
import { Server } from "./infrastructure/web/server";

function main(): void {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });
  server.start();
}

(async () => {
  main();
})();