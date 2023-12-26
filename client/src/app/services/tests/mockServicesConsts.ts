import { IIngridietnsList, IRecipe } from 'src/app/models/RecipeModel';
import { IFetch } from 'src/app/models/ServiceModels';
import { IUser } from 'src/app/models/UserModel';

export const mockRecipes: IRecipe[] = [
    {
        cheap: true,
        cuisines: [],
        readyInMinutes: 45,
        dishTypes: [],
        analyzedInstructions: [
            {
                name: '',
                steps: [
                    {
                        number: 1,
                        step: '',
                        ingredients: [{ id: 1, name: '', image: '', amount: 1, unit: '' }],
                        equipment: [{ id: 1, name: '', image: '', amount: 1, unit: '' }],
                    },
                ],
            },
        ],
        servings: 1,
        summary: '',
        sustainable: true,
        title: '',
        glutenFree: true,
        lowFodmap: true,
        dairyFree: true,
        diets: [],
        vegan: true,
        vegetarian: true,
        veryHealthy: true,
        veryPopular: true,
        id: 1,
        image: '',
        nutrition: {
            nutrients: [{ name: '', amount: 1, unit: '', percentOfDailyNeeds: 1 }],
            properties: [{ name: '', amount: 1, unit: '' }],
            ingredients: [{ id: 1, name: '', image: '', amount: 1, unit: '' }],
        },
    },
];
export const mockListOfIngtidients: IIngridietnsList[] = [
    { id: 1, ingridient: '1' },
    { id: 2, ingridient: '2' },
];
export const mockUser: IUser = {
    id: 1,
    isActivated: 0,
    name: 'name',
    registrationDate: '19-11-2023',
    email: 'email',
    data: {
        favorits: [],
        recipes: [],
        profileInfo: '',
        filterData: {
            intolerances: [],
            diets: [],
        },
    },
};
export const mockRecipesForHttp: IFetch = {
    results: mockRecipes,
    offset: 1,
    number: 1,
    totalResults: 21,
};
