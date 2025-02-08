const Restaurant = require("../Schema/restaurant");

const getRestaurants = async ({ page = 1, limit = 10 }) => {
  try {
    const offset = (page - 1) * limit; // Calculate skip value

    const restaurants = await Restaurant.find()
      .skip(offset) // Skip previous pages' records
      .limit(limit); // Limit results to the specified amount

    const total = await Restaurant.countDocuments(); // Get total restaurant count

    return {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: restaurants,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
};

const getRestaurantById = async ({ restaurantId }) => {
    console.log(restaurantId)
  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId });
    console.log(restaurant)
    return restaurant;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { getRestaurantById, getRestaurants };
