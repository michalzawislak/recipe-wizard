import { OpenAI } from 'openai';
import { ChatCompletion } from 'openai/resources';
import { RecipeData } from '../models/recipe-response';
import { generateImage } from './generate-image';

const openai = new OpenAI();

export async function generateRecipe(diet:string, ingredients:string, cuisine:string, calories:number): Promise<RecipeData | null> {
  const prompt = `Create a ${diet} recipe with the following ingredients: ${ingredients}. Cuisine type: ${cuisine}. Ensure the total calories do not exceed ${calories} kcal, and is close to this value. Always answer in the language in which the ingredients are described. Only use ingredients that go well together. You dont have to use all ingredients, use only those that go well together.`;
  const response: ChatCompletion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: 'You are a helpful assistant designed to help user to make a recipe.'
      },
      {
        role: "user",
        content: prompt
      }
    ],
    functions: [
      {
        name: "generate_recipe",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the recipe."
            },
            cuisine: {
              type: "string",
              description: "The cuisine type of the recipe."
            },
            ingredients: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "The name of the ingredient."
                  },
                  quantity: {
                    type: "string",
                    description: "The quantity of the ingredient."
                  },
                  unit: {
                    type: "string",
                    description: "The unit of measurement for the ingredient."
                  },
                  calories: {
                    type: "integer",
                    description: "The caloric content of the ingredient."
                  }
                },
                required: ["name", "quantity", "unit", "calories"]
              },
              description: "A list of ingredients required for the recipe."
            },
            totalCalories: {
              type: "integer",
              description: "The total caloric content of the recipe."
            },
            instructions: {
              type: "array",
              items: {
                type: "string",
                description: "A step-by-step instruction for preparing the recipe."
              },
              description: "The cooking instructions for the recipe."
            }
          },
          required: ["name", "cuisine", "ingredients", "totalCalories", "instructions"]
        }
      }
    ]
  });
  const ingredientsList = JSON.parse(response.choices[0].message.function_call?.arguments ?? "").ingredients.map((ingredient: any) => ingredient.name).join(", ");
  const image = await generateImage(`
    ${JSON.parse(response.choices[0].message.function_call?.arguments ?? "").name}
    ${ingredientsList}
  `);
  console.log(image);
  const recipeData = response ? JSON.parse(response.choices[0].message.function_call?.arguments ?? "") as RecipeData : null;
  if(recipeData) {
    recipeData.image = image;
  }
  return recipeData as RecipeData;
}

