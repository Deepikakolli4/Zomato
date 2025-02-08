import React from 'react';
import { useLocation } from 'react-router-dom';

function RestaurantDetails() {
    const location = useLocation();
    const { results, noResults } = location.state || {}; // Access the data passed from the search page
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('searchQuery');
    const searchLocation = queryParams.get('location');

    if (noResults) {
        return <p>No restaurants found for your search: {searchQuery} in {searchLocation}.</p>;
    }

    if (!results) {
        return <p>Loading...</p>; // Or display an initial message
    }

    // Now you can use the 'results' data to display the restaurant details.
    return (
        <div>
            <h2>Restaurant Details</h2>
            {Array.isArray(results) ? (
                results.map(restaurant => (
                    <div key={restaurant.id}>
                        <h3>{restaurant.name}</h3>
                        {/* Display other restaurant details */}
                    </div>
                ))
            ) : (
                <div>
                    <h3>{results.name}</h3>
                    {/* Display other restaurant details */}
                </div>
            )}
        </div>
    );
}

export default RestaurantDetails;
