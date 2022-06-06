const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  foodName: { type: String, required: true },
  foodId: { type: Number, required: true },
  mealType: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitProtein: { type: Number, required: true },
  unitCarbs: { type: Number, required: true },
  unitFat: { type: Number, required: true },
  unitCalories: { type: Number, required: true },
  totalCalories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
});

module.exports = mongoose.model('Food', FoodSchema);
