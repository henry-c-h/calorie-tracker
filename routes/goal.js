const router = require('express').Router();
const Goal = require('../models/Goal');

router.get('/', async (req, res) => {
  try {
    const goal = await Goal.find();
    res.json(goal);
  } catch (err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newGoal = new Goal({
      calorieGoal: req.body.calorieGoal,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fat: req.body.fat,
      proteinInGrams: req.body.proteinInGrams,
      carbsInGrams: req.body.carbsInGrams,
      fatInGrams: req.body.fatInGrams,
    });
    const goal = await newGoal.save();
    res.json(goal);
  } catch (err) {
    res.json(err);
  }
});

router.put('/:goalId', async (req, res) => {
  try {
    const updatedGoal = await Goal.findOneAndUpdate(
      {
        _id: req.params.goalId,
      },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedGoal);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
