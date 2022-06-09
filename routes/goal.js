const router = require('express').Router();
const Goal = require('../models/Goal');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    const user = req.headers.user;
    const goal = await Goal.findOne({ user: mongoose.Types.ObjectId(user) });
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
      user: mongoose.Types.ObjectId(req.headers.user),
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
        _id: mongoose.Types.ObjectId(req.params.goalId),
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
