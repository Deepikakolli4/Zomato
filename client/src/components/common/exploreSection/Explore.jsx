import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./exploreSection.css";

const ExploreSection = () => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Function to fetch restaurants data
  const getRestaurants = async (page) => {
    try {
      const response = await axios.get("http://localhost:8000/restaurants/", {
        params: { page, limit: 10 }, // Send page and limit as query parameters
      });

      // Extract the relevant data from the response
      const restaurants = response.data.restaurants[0].restaurants; // Assuming restaurants array is nested inside another object
      setRestaurantsData(restaurants);
      setTotalPages(Math.ceil(response.data.total / 10)); // Adjust total pages calculation
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  // Fetch restaurants when the page changes
  useEffect(() => {
    getRestaurants(currentPage);
  }, [currentPage]);

  // Function to handle navigation
  const handleNavigation = (restaurant) => {
    navigate("/restaurantDetail", { state: { restaurant } });
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="explore-card cur-po">
      <div className="title">Famous Restaurants</div>
      <div className="explore-card-cover">
        {restaurantsData && restaurantsData.length > 0 && (
          <div className="card-container">
            {restaurantsData.map((restaurant, index) => (
              <div
                key={index}
                className="card"
                onClick={() => handleNavigation(restaurant.restaurant)} // Navigate on click
              >
                <img
                  src={restaurant.restaurant.featured_image || "fallback-image-url.jpg"} // Access featured_image properly
                  width={100}
                  height={100}
                  alt={restaurant.restaurant.name}
                />
                <span>{restaurant.restaurant.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="pagination">
        <button className="previous" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button className="next" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ExploreSection;


