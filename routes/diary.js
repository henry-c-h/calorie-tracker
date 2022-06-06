const router = require('express').Router();
const Food = require('../models/Food');
const fetch = require('node-fetch');

// get food items from db
router.get('/', async (req, res) => {
  try {
    const allFoodItems = await Food.find();
    res.json(allFoodItems);
  } catch (err) {
    res.json(err);
  }
});

router.get('/search/:searchTerm', async (req, res) => {
  try {
    const fetchUrl = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${req.params.searchTerm}&metaInformation=true`;
    const result = await fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
    const data = await result.json();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.get('/ingredient/:ingredientId', async (req, res) => {
  try {
    const fetchUrl = `https://api.spoonacular.com/food/ingredients/${req.params.ingredientId}/information?amount=1`;
    const result = await fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
    const data = await result.json();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.get('/ingredient/:ingredientId/:unit', async (req, res) => {
  try {
    const fetchUrl = `https://api.spoonacular.com/food/ingredients/${req.params.ingredientId}/information?amount=1&unit=${req.params.unit}`;
    const result = await fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
    const data = await result.json();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const foodItem = new Food({
      foodName: req.body.foodName,
      foodId: req.body.foodId,
      mealType: req.body.mealType,
      unit: req.body.unit,
      quantity: req.body.quantity,
      unitProtein: req.body.unitProtein,
      unitCarbs: req.body.unitCarbs,
      unitFat: req.body.unitFat,
      unitCalories: req.body.unitCalories,
      totalCalories: req.body.totalCalories,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fat: req.body.fat,
    });
    const newFoodItem = await foodItem.save();
    res.json(newFoodItem);
  } catch (err) {
    res.json(err);
  }
});

router.delete('/:itemId', async (req, res) => {
  try {
    const deletion = await Food.deleteOne({
      _id: req.params.itemId,
    });
    res.json(deletion);
  } catch (err) {
    res.json(err);
  }
});

router.put('/:itemId', async (req, res) => {
  try {
    const updatedItem = await Food.findOneAndUpdate(
      {
        _id: req.params.itemId,
      },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
