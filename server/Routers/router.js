const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantDetailsController');

// Get all restaurants
router.get('/restaurants', restaurantController.getAllRestaurants);

// Get a single restaurant by ID
router.get('/restaurants/:id', restaurantController.getRestaurantById);

// Get restaurants by city
router.get('/restaurants/city/:city', restaurantController.getRestaurantByCity);

// Get restaurants by location
router.get('/restaurants/location/:location', restaurantController.getRestaurantsByLocation);

// Get restaurants by address
router.get('/restaurants/address/:address', restaurantController.getRestaurantsByAddress);

// Get restaurants by rating
router.get('/restaurants/rating/:rating', restaurantController.getRestaurantsByRating);

// Get restaurants by name
router.get('/restaurants/name/:name', restaurantController.getRestaurantsByName);

// // Add a new restaurant
// router.post('/restaurants', restaurantController.addRestaurant);

// // Update a restaurant by ID
// router.put('/restaurants/:id', restaurantController.updateRestaurant);

// // Delete a restaurant by ID
// router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

module.exports = router;
