# Personalized Recipe Wizard

## Description
An application that generates culinary recipes based on available ingredients, dietary preferences, selected cuisine, and calorie count.

## Technologies
- Frontend: Angular
- Backend: Node.js with Fastify
- Database: PostgreSQL
- APIs: OpenAI

## Installation

### Frontend
1. Install Angular CLI: `npm install -g @angular/cli`
2. Create a new project: `ng new recipe-generator`
3. Navigate to the project directory: `cd recipe-generator`
4. Install dependencies: `npm install`
5. Run the project: `ng serve`

### Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and configure the environment variables:
    ```plaintext
    OPENAI_API_KEY=your_openai_api_key
    EDAMAM_APP_ID=your_edamam_app_id
    EDAMAM_API_KEY=your_edamam_api_key
    PGUSER=your_postgres_user
    PGHOST=localhost
    PGDATABASE=recipe_db
    PGPASSWORD=your_postgres_password
    PGPORT=5432
    ```
4. Compile TypeScript: `npm run build`
5. Start the server: `npm start`

## API Endpoints

### Generate Recipe
- **Endpoint:** `/api/generate-recipe`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "ingredients": "tomato, onion, garlic",
    "diet": "vegan",
    "cuisine": "italian",
    "calories": 500
  }
