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
    servings:number;
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

export interface INutruent {
    name: string;
    // name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
}
export interface IProperties {
    name: string;
    amount: number;
    unit: string;
}
interface IAnalyzedInstructions {
    name: string;
    steps: ISteps[];
}
export interface ISteps {
    number: number;
    step: string;
    ingredients: IIngredients[];
    equipment: IEquipment[];
}
interface IIngredients {
    id: number;
    name: string;
    // localizedName: string;
    image: string;
    amount:number;
    unit:string;
}
interface IEquipment extends IIngredients {}
export interface IIngridietnsList {
    ingridient: string;
    id: number;
}
export interface IQueryParams {
    [key: string]: string | boolean;
    cuisines: string | boolean;
    diets: string | boolean;
    dishTypes: string | boolean;
    ingridients: string | boolean;
    intolerances: string | boolean;
    time: string | boolean;
    stepByStep: boolean;
    fats: string | boolean;
    proteins: string | boolean;
    calories: string | boolean;
    carbs: string | boolean;
}
