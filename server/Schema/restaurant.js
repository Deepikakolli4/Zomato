const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurantId: {
    type: Number,
    required: true,
    unique: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  countryCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
  },
  localityVerbose: {
    type: String,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  cuisines: {
    type: String,
  },
  averageCostForTwo: {
    type: Number,
  },
  currency: {
    type: String,
  },
  hasTableBooking: {
    type: Boolean,
    default: false,
  },
  hasOnlineDelivery: {
    type: Boolean,
    default: false,
  },
  isDeliveringNow: {
    type: Boolean,
    default: false,
  },
  switchToOrderMenu: {
    type: Boolean,
    default: false,
  },
  priceRange: {
    type: Number,
  },
  aggregateRating: {
    type: Number,
  },
  ratingColor: {
    type: String,
  },
  ratingText: {
    type: String,
  },
  votes: {
    type: Number,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // Ensure it stores [longitude, latitude]
      required: true,
      validate: {
        validator: function (val) {
          return val.length === 2;
        },
        message: "Coordinates must contain longitude and latitude",
      },
    },
  },
});

// Geospatial index
restaurantSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
