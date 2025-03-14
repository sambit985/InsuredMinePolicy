const User = require('../models/user');
const PolicyInfo = require('../models/policyInfo');

exports.getPolicyByUsername = async (req, res) => {
  try {
    const { username } = req.body;
    if(!username) return res.status(400).json({ message: 'Username is required' });

    const user = await User.findOne({ firstname: username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const policies = await PolicyInfo.find({ firstname: user.firstname }).lean();
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPolicyAggregation = async (req, res) => {
    try {
      const aggregation = await PolicyInfo.aggregate([
        {
          $group: {
            _id: "$firstname", // Grouping by firstname
            policyCount: { $sum: 1 }
          }
        }
      ]);
  
      res.json(aggregation);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
