import { IRecipe } from './RecipeModel';

export interface ILogin {
    accessToken: string;
    message: string;
    refreshToken: string;
    user: IUser;
}
export interface IUser {
    email: string;
    id: number;
    name: string;
    registrationDate: string;
    isActivated: number;
    data: IUserData;
}
interface IUserData {
    favorits: number[];
    recipes: IRecipe[];
    profileInfo: string;
    filterData: IFilterData;
}
interface IFilterData {
    intolerances: string[];
    diets: string[];
}
export interface IUserInfo extends IFilterData {
    profileInfo: string;
}
export interface IusersDietAndIntoleraces {
    diets: string[];
    intolerances: string[];
}
