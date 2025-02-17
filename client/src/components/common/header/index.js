import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('id');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUsername = localStorage.getItem('username');
        if (token) {
            setIsLoggedIn(true);
            setUsername(storedUsername || 'User');
        }
    }, []);

    const handleLoginClick = () => navigate('/login');
    const handleSignUpClick = () => navigate('/signup');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        navigate('/login');
    };

    const handleLocationChange = (e) => setSelectedLocation(e.target.value);
    const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleSearch = async () => {
        const trimmedSearchQuery = searchQuery.trim();
        if (!trimmedSearchQuery) {
            console.warn('Search query is empty.');
            return;
        }
    
        let url = '';
        switch (selectedLocation) {
            case 'id':
                url = `http://localhost:8000/restaurants/${trimmedSearchQuery}`;
                break;
            case 'name':
                url = `http://localhost:8000/restaurants/name/${trimmedSearchQuery}`;
                break;
            case 'city':
                url = `http://localhost:8000/restaurants/city/${trimmedSearchQuery}`;
                break;
            case 'rating':
                url = `http://localhost:8000/restaurants/rating/${trimmedSearchQuery}`;
                break;
            case 'address':
                url = `http://localhost:8000/restaurants/address/${encodeURIComponent(trimmedSearchQuery)}`;
                break;
            default:
                console.error('Invalid search type selected.');
                return;
        }
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Error: HTTP error! Status: ${response.status}`);
                return;
            }
    
            const data = await response.json();
            console.log('Fetched data:', data);
    
            // Use normal map to extract restaurants
            const restaurants = data;

            console.log('Final restaurant list:', restaurants);
    
            // Navigate to RestaurantSearch and pass the mapped data
            navigate("/restaurantSearch", { state: { restaurants } });
    
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    
    return (
        <div className="max-width header">
            <img
                src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
                alt="ZomatoLogo"
                className="header-logo"
            />
            <div className="header-right">
                <div className="header-location-search-container">
                    <div className="location-wrapper">
                        <select className="location-dropdown" value={selectedLocation} onChange={handleLocationChange}>
                            <option value="id">Search by ID</option>
                            <option value="name">Search by Name</option>
                            <option value="city">Search by City</option>
                            <option value="rating">Search by Rating</option>
                            <option value="address">Search by Address</option>
                        </select>
                    </div>
                    <div className="header-searchbar">
                        <input
                            placeholder="Search for restaurant, cuisine, or a dish"
                            className="search-input"
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <div className="profile-section">
                            <img
                                src="https://b.zmtcdn.com/images/user_avatars/mug_2x.png?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A"
                                alt="Profile"
                                className="header-profile-image"
                            />
                            <span className="header-username">{username}</span>
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <button className="login-button" onClick={handleLoginClick}>Login</button>
                            <button className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
