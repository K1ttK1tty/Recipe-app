const axios = require('axios');
class apiController {
    async fetchRecipes(req, res, next) {
        try {
            const numberOfSkip = req.params.numberOfSkip;
            const skipParam = numberOfSkip > 0 ? `&offset=${numberOfSkip}` : '';
            let recipeParams = skipParam;
            for (let key in req.query) {
                if (req.query[key] !== 'false') {
                    recipeParams += req.query[key];
                }
            }
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
    async botConversation(req, res, next) {
        try {
            const { userMessage } = req.body;
            const response = await fetch(process.env.BOT_URL + userMessage, {
                method: 'GET',
                headers: {
                    'x-api-key': process.env.RECIPES_API_KEY,
                    Accept: 'application/json',
                    'content-type': 'application/json; charset=UTF-8',
                },
            }).then(res => res.json());
            return res.json(response);
        } catch (err) {
            return res.json({
                answerText: "Sorry, I can't talk about it :(",
            });
        }
    }
}
module.exports = new apiController();
