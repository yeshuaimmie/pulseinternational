const mongoose = require('mongoose');

const referralBonusSchema = new mongoose.Schema({
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  investment: { type: mongoose.Schema.Types.ObjectId, ref: 'Investment', required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ReferralBonus', referralBonusSchema);
