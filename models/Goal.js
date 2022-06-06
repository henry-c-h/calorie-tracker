const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  calorieGoal: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  proteinInGrams: { type: Number, required: true },
  carbsInGrams: { type: Number, required: true },
  fatInGrams: { type: Number, required: true },
});

module.exports = mongoose.model('Goal', GoalSchema);
