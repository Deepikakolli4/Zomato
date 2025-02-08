const express = require("express");
const router = express.Router();

const restraurantController = require('../Controllers/restaurantController')

router.get("/", restraurantController.getRestaurants);
router.get("/:id", restraurantController.getRestaurantById);

module.exports = router;
