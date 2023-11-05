class apiController {
    async fetchRecipes(req, res, next) {
        try {
            const numberOfSkip = req.params.numberOfSkip;
            const skipParam = numberOfSkip > 0 ? `&offset=${numberOfSkip}` : '';
            // let recipeParams = '&offset=0';
            let recipeParams = skipParam;
            for (let key in req.query) {
                if (req.query[key] !== 'false') {
                    recipeParams += req.query[key];
                }
            }
            console.log(recipeParams);
            const recipes = await fetch(
                process.env.RECIPES_URL +
                    process.env.RECIPES_API_KEY +
                    '&number=21&addRecipeNutrition=true' +
                    recipeParams,
                {
                    method: 'GET',
                }
            ).then(res => res.json());
            return res.json(recipes);
        } catch (err) {
            next();
        }
    }
}
module.exports = new apiController();
