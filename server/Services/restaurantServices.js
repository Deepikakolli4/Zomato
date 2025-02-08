const Restaurant = require('../Schema/restaurantCollections');

// Get all restaurants with pagination
const getAllRestaurants = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const restaurants = await Restaurant.find().skip(skip).limit(limit);
        const total = await Restaurant.countDocuments();
        return { restaurants, total };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get a single restaurant by ID
const getRestaurantById = async (id) => {
    try {
        return await Restaurant.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get restaurants by city
const getRestaurantByCity = async (city) => {
    try {
        return await Restaurant.findOne({ city });  
    } catch (error) {
        throw new Error(error.message);
    }
};

// const getImageRestaurants = async (url) => {
//     try {
//         return await Restaurant.findOne({ city });  
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// Add a new restaurant
const addRestaurant = async (restaurantData) => {
    try {
        return await new Restaurant(restaurantData).save();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update a restaurant by ID
const updateRestaurant = async (id, restaurantData) => {
    try {
        return await Restaurant.findByIdAndUpdate(id, restaurantData, { new: true });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete a restaurant by ID
const deleteRestaurant = async (id) => {
    try {
        return await Restaurant.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get restaurants by location with pagination
const getRestaurantsByLocation = async (location, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const restaurants = await Restaurant.find({ "location.locality": location }).skip(skip).limit(limit);
        const total = await Restaurant.countDocuments({ "location.locality": location });
        return { restaurants, total };
    } catch (error) {
        throw new Error(error.message);
    }
};


// Get restaurants by rating with pagination
const getRestaurantsByRating = async (rating, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const restaurants = await Restaurant.find({ "user_rating.aggregate_rating": { $gte: rating } }).skip(skip).limit(limit);
        const total = await Restaurant.countDocuments({ "user_rating.aggregate_rating": { $gte: rating } });
        return { restaurants, total };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get restaurants by address with pagination
const getRestaurantsByAddress = async (address, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const restaurants = await Restaurant.find({ Address: address }).skip(skip).limit(limit);
        const total = await Restaurant.countDocuments({ Address: address });
        return { restaurants, total };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get restaurants by name with pagination
const getRestaurantsByName = async (name, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;  // Ensure 'skip' is defined before usage
        const restaurants = await Restaurant.find({ "Restaurant Name": name })  // Use quotes for keys with spaces
                                          .skip(skip)
                                          .limit(limit);
        const total = await Restaurant.countDocuments({ "Restaurant Name": name });

        return { restaurants, total };
    } catch (error) {
        console.error('Error fetching restaurants by name:', error);
        throw new Error(error.message);
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
    getRestaurantsByName
};
