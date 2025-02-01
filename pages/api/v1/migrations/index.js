import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler({
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
});

const defaultMigrationOptions = {
  dbClient: null,
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function getHandler(req, res) {
  let dbClient = await database.getNewClient();

  try {
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient: dbClient,
    });

    return res.status(200).json(pendingMigrations);
  } finally {
    await dbClient.end();
  }
}

async function postHandler(req, res) {
  let dbClient = await database.getNewClient();

  try {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient: dbClient,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations);
    }

    return res.status(200).json(migratedMigrations);
  } finally {
    await dbClient.end();
  }
}
