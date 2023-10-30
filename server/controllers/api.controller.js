class apiController {
    async fetchRecipes(req, res, next) {
        try {
            const numberOfSkip = req.params.numberOfSkip;
            const queryParam = numberOfSkip > 0 ? `&offset=${numberOfSkip}` : '';
            const recipes = await fetch(
                process.env.RECIPES_URL +
                    process.env.RECIPES_API_KEY +
                    '&number=21&addRecipeNutrition=true' +
                    queryParam,
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
