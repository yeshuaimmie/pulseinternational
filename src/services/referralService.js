const ReferralBonus = require('../models/ReferralBonus');
const User = require('../models/User');

exports.createReferralBonus = async ({ referrerId, referredUserId, investmentId, amount }) => {
  if (!referrerId || amount <= 0) return null;

  // One-time only: check if a referral bonus was already paid for this referred user
  const alreadyPaid = await ReferralBonus.findOne({ referredUser: referredUserId }).lean();
  if (alreadyPaid) return null;

  try {
    const bonus = await ReferralBonus.create({ referrer: referrerId, referredUser: referredUserId, investment: investmentId, amount });
    await User.findByIdAndUpdate(referrerId, { $inc: { balance: amount, referralEarnings: amount } });
    return bonus;
  } catch (err) {
    // If the unique index on referredUser rejects a duplicate, silently skip
    if (err.code === 11000) return null;
    throw err;
  }
};
