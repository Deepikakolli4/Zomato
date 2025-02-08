const restaurantServices = require('../Services/restaurantServices');

// Get all restaurants with pagination
const getAllRestaurants = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await restaurantServices.getAllRestaurants(page, limit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single restaurant by ID
const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await restaurantServices.getRestaurantById(id);
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get restaurants by city
const getRestaurantByCity = async (req, res) => {
    try {
        const { city } = req.query;
        const restaurant = await restaurantServices.getRestaurantByCity(city);
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Add a new restaurant
const addRestaurant = async (req, res) => {
    try {
        const restaurantData = req.body;
        const newRestaurant = await restaurantServices.addRestaurant(restaurantData);
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a restaurant by ID
const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantData = req.body;
        const updatedRestaurant = await restaurantServices.updateRestaurant(id, restaurantData);
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Delete a restaurant by ID
const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRestaurant = await restaurantServices.deleteRestaurant(id);
        res.status(200).json({ message: 'Restaurant deleted successfully', deletedRestaurant });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get restaurants by location with pagination
const getRestaurantsByLocation = async (req, res) => {
    try {
        const { location, page = 1, limit = 10 } = req.query;
        const result = await restaurantServices.getRestaurantsByLocation(location, page, limit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get restaurants by rating with pagination
const getRestaurantsByRating = async (req, res) => {
    try {
        const { rating, page = 1, limit = 10 } = req.query;
        const result = await restaurantServices.getRestaurantsByRating(rating, page, limit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get restaurants by address with pagination
const getRestaurantsByAddress = async (req, res) => {
    try {
        const { address, page = 1, limit = 10 } = req.query;
        const result = await restaurantServices.getRestaurantsByAddress(address, page, limit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get restaurants by name with pagination
const getRestaurantsByName = async (req,res) => {
    try {
        const { name , page = 1, limit = 10 } = req.query;
        const result = await restaurantServices.getRestaurantsByAddress(name, page, limit);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message);
    }
};

const getImageRestaurants = async (req,res) => {
    try {
        const { url } = req.query;
        const restaurant = await restaurantServices.getRestaurantByCity(url);
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    getRestaurantByCity,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantsByLocation,
    getRestaurantsByAddress,
    getRestaurantsByRating,
    getRestaurantsByName,
    getImageRestaurants
};
