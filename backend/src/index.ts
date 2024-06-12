import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import pool from './db';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { generateRecipe } from './common/generate-recipe';
import { RecipeData } from './models/recipe-response';
import { GenerateRecipeRequest } from './models/recipe-request';
import { GetIngredientsRequest } from './models/photo-request';
import { getIngredientsFromImage } from './common/get-ingredients-from-image';

dotenv.config();

const fastify: FastifyInstance = Fastify({ logger: true });
const allowedDiets = ['any', 'vegan', 'vegetarian', 'pescatarian', 'keto', 'paleo', 'low-carb', 'low-fat', 'gluten-free', 'dairy-free', 'nut-free', 'halal', 'kosher'];
const allowedCuisines = ['any', 'polish', 'italian', 'chinese', 'japanese', 'mexican', 'indian', 'french', 'greek', 'thai', 'spanish', 'middle eastern', 'american', 'british', 'korean', 'vietnamese'];


fastify.register(cors, { 
  origin: true
});

fastify.post('/api/generate-recipe', async (request: FastifyRequest<GenerateRecipeRequest>, reply: FastifyReply) => {
  const { ingredients, diet, cuisine, calories } = request.body;

  if (!allowedDiets.includes(diet.toLowerCase())) {
    return reply.status(400).send({ error: 'Invalid diet type' });
  }

  if (!allowedCuisines.includes(cuisine.toLowerCase())) {
    return reply.status(400).send({ error: 'Invalid cuisine type' });
  }

  const recipe: RecipeData | null = await generateRecipe(diet, ingredients, cuisine, calories);
  const estimatedCalories = recipe ? recipe.totalCalories : null;

  await pool.query(
    'INSERT INTO recipes (ingredients, diet, cuisine, calories, recipe, estimated_calories) VALUES ($1, $2, $3, $4, $5, $6)',
    [ingredients, diet, cuisine, calories, recipe, estimatedCalories]
  );

  reply.send(recipe);
});

fastify.post('/api/get-ingredients', async (request: FastifyRequest<GetIngredientsRequest>, reply: FastifyReply) => {
  const ingredietns = await getIngredientsFromImage(request.body.baseImage);
  reply.send({ ingredients: ingredietns });
});

const runMigrations = async () => {
  const initSql = fs.readFileSync(path.resolve(__dirname, 'migrations/init.sql'), 'utf-8');
  await pool.query(initSql);
};

const start = async () => {
  try {
    runMigrations();
    await fastify.listen({ port: 4040});
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

