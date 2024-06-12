interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
  calories: number;
}

export interface RecipeData {
  name: string;
  image?: string;
  cuisine: string;
  ingredients: Ingredient[];
  totalCalories: number;
  instructions: string[];
}
