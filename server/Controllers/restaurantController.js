const RestaurantService = require("../Services/restaurantService");
const getRestaurants = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const result = await RestaurantService.getRestaurants({ page, limit });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving restaurants:", error);
    res.status(500).json({ message: "Error retrieving data from DB" });
  }
};

const getRestaurantById = async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const restaurant = await RestaurantService.getRestaurantById({
      restaurantId,
    });
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving restaurant from DB" });
  }
};

module.exports = { getRestaurants, getRestaurantById };
