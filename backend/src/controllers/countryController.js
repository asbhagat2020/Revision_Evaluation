const axios = require('axios');
const Favorite = require('../models/Favorite');
const SearchHistory = require('../models/SearchHistory');

exports.getCountriesByCurrency = async (req, res) => {
  const currencyCode = req.query.currency; // Ensure currencyCode is extracted correctly
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    console.log('API response:', response.data); // Debugging log
    const countries = response.data.filter(country => {
      return country.currencies && Object.keys(country.currencies).some(code => code === currencyCode);
    });
    console.log('Filtered countries:', countries); // Debugging log
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).send('Server error');
  }
};

exports.addFavorite = async (req, res) => {
  const { countryCode } = req.body;
  const userId = req.user._id;
  const favorite = new Favorite({ userId, countryCode });
  await favorite.save();
  res.send('Favorite added');
};

exports.getFavorites = async (req, res) => {
  const userId = req.user._id;
  const favorites = await Favorite.find({ userId });
  res.json(favorites);
};

exports.addSearchHistory = async (req, res) => {
  const { currencyCode } = req.body;
  const userId = req.user._id;
  let history = await SearchHistory.findOne({ userId });
  if (!history) {
    history = new SearchHistory({ userId, searches: [currencyCode] });
  } else {
    history.searches = [...new Set([currencyCode, ...history.searches])].slice(0, 5);
  }
  await history.save();
  res.send('Search history updated');
};

exports.getSearchHistory = async (req, res) => {
  const userId = req.user._id;
  const history = await SearchHistory.findOne({ userId });
  res.json(history ? history.searches : []);
};
