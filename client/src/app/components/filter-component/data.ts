import { ICuisines, IDishType } from "src/app/models/RecipeModel";
export const allDishTypes: IDishType[] = [
    'appetizer',
    'antipasti',
    'antipasto',
    'bread',
    'breakfast',
    'dessert',
    'drink',
    'dinner',
    'fingerfood',
    'main course',
    'marinade',
    'lunch',
    'main dish',
    'morning meal',
    'snack',
    'soup',
    'sauce',
    'salad',
    'side dish',
    'starter',
    "hor d'oeuvre",
    'brunch',
];
export const allCuisines: ICuisines[] = [
    'African',
    'Asian',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese',
];
export const allIntolerances: string[] = [
    'Dairy',
    'Egg',
    'Gluten',
    'Grain',
    'Peanut',
    'Seafood',
    'Sesame',
    'Shellfish',
    'Soy',
    'Sulfite',
    'Tree Nut',
    'Wheat',
];
export const allDiets: string[] = [
    'gluten free',
    'dairy free',
    'lacto ovo vegetarian',
    'vegan',
    'paleolithic',
    'primal',
    'whole 30',
    'pescatarian',
    'ketogenic',
    'fodmap friendly',
];