DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM   pg_database
      WHERE  datname = 'recipe_db') THEN
      CREATE DATABASE recipe_db;
   END IF;
END
$do$;

CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    ingredients TEXT NOT NULL,
    diet TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    calories INTEGER NOT NULL,
    recipe TEXT NOT NULL,
    estimated_calories INTEGER
);
