import React from 'react';
import { useLocation } from 'react-router-dom';
import './RestaurantSearch.css';

const RestaurantSearch = () => {
    const location = useLocation();
    const { restaurants = [] } = location.state || {};  // Ensure it's an array
    console.log(restaurants.restaurants[0].restaurants, "helloo");

    return (
        <div className="restaurant-search">
            <h1 className="title">Search Results</h1>
            {restaurants.restaurants.length > 0 ? (
                <div className="restaurant-list">
                    {restaurants.restaurants[0].restaurants.map((restaurant) => (
                        <div className="restaurant-card">
                            {console.log(restaurant.restaurant,"hellooo")}
                            <img
                                className="restaurant-img"
                                src={restaurant.restaurant.featured_image}
                                alt={restaurant.restaurant.name || "Restaurant Image"}
                            />
                            <h2 className="restaurant-name">{restaurant.restaurant.name}</h2>
                            <p className="cuisines">{restaurant.restaurant.cuisines || "Not available"}</p>
                            <p className="rating">
                                ⭐ {restaurant.restaurant.user_rating?.aggregate_rating ?? "No Rating"}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default RestaurantSearch;
