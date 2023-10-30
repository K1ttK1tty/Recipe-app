export interface IRecipe {
    cuisines: string[];
    id: number;
    title: string;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    readyInMinutes: number;
    image: string;
    nutrition: {
        nutrients: INutruent[];
        properties: IProperties[];
        ingredients: IIngredients[];
    };
    summary: string;
    dishTypes: IDishType[];
    diets: string[];
    analyzedInstructions: IAnalyzedInstructions[];
}
// export interface ICuisines{}
export type ICuisines =
    | 'African'
    | 'Asian'
    | 'American'
    | 'British'
    | 'Cajun'
    | 'Caribbean'
    | 'Chinese'
    | 'Eastern European'
    | 'European'
    | 'French'
    | 'German'
    | 'Greek'
    | 'Indian'
    | 'Irish'
    | 'Italian'
    | 'Japanese'
    | 'Jewish'
    | 'Korean'
    | 'Latin American'
    | 'Mediterranean'
    | 'Mexican'
    | 'Middle Eastern'
    | 'Nordic'
    | 'Southern'
    | 'Spanish'
    | 'Thai'
    | 'Vietnamese';
export type IDishType =
    | 'main course'
    | 'side dish'
    | 'dessert'
    | 'appetizer'
    | 'salad'
    | 'bread'
    | 'breakfast'
    | 'soup'
    | 'beverage'
    | 'sauce'
    | 'marinade'
    | 'fingerfood'
    | 'snack'
    | 'drink'
    | 'lunch'
    | 'main dish'
    | 'morning meal'
    | 'dinner'
    | 'antipasti'
    | 'antipasto'
    | 'starter'
    | "hor d'oeuvre"
    | 'brunch';

interface INutruent {
    name: 'Calories' | 'Fat' | 'Carbohydrates' | 'Protein' | string;
    // name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
}
interface IProperties {
    name: string;
    amount: string;
    unit: string;
}
interface IAnalyzedInstructions {
    name: string;
    steps: ISteps[];
}
interface ISteps {
    number: number;
    step: string;
    ingredients: IIngredients[];
    equipment: IEquipment[];
}
interface IIngredients {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}
interface IEquipment extends IIngredients {}
