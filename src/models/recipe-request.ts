export interface GenerateRecipeRequest {
  Body: {
    ingredients: string;
    diet: string;
    cuisine: string;
    calories: number;
  };
}