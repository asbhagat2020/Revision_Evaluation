const express = require('express');
const { getCountriesByCurrency, addFavorite, getFavorites, addSearchHistory, getSearchHistory } = require('../controllers/countryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/currency', authMiddleware, getCountriesByCurrency);
router.post('/favorite', authMiddleware, addFavorite);
router.get('/favorites', authMiddleware, getFavorites);
router.post('/history', authMiddleware, addSearchHistory);
router.get('/history', authMiddleware, getSearchHistory);
module.exports = router;
