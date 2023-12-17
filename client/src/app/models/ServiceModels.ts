import { IRecipe } from "./RecipeModel";

export interface IFetch {
    results?: IRecipe[] | undefined;
    offset?: number | undefined;
    number?: number | undefined;
    totalResults?: number | undefined;
}
export interface IBotResponse{
    answerText:string;
    media:any 
}