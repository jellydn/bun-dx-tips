import logger from "@productsway/logger";
import { Database } from "bun:sqlite";

/**
 * Creates a DB instance
 * @param type - SQLite3 database or in-memory database
 * @param path - DB path
 * @returns DB instance
 */
export function createDB(
  type: "sqlite" | "memory" = "memory",
  path?: string,
): Database {
  logger.info(`Creating DB instance of type ${type}`);
  if (type === "sqlite") {
    return new Database(path, {
      // create the database if the file doesn't exist:
      create: true,
    });
  }

  return new Database(":memory:");
}

/**
 * Closes the DB
 * @param db - DB instance
 * @returns void
 */
export function closeDB(db: Database): void {
  logger.info("Closing DB instance");
  db.close();
}

export { Database };
