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
            setUsername(storedUsername);
        }
    }, []);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        navigate('/login');
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        let url = '';

        // Input Validation:  Trim the search query and check for emptiness
        const trimmedSearchQuery = searchQuery.trim();
        if (!trimmedSearchQuery) {
            console.warn('Search query is empty.');
            return;
        }

        // Construct the URL based on the search location
        if (selectedLocation === 'id') {
            url = `http://localhost:8000/restaurants/${trimmedSearchQuery}`;
        } else if (selectedLocation === 'name') {
            url = `http://localhost:8000/restaurants/name/${trimmedSearchQuery}`;
        } else if (selectedLocation === 'location') {
            url = `http://localhost:8000/restaurants/city/${trimmedSearchQuery}`;
        } else {
            console.error('Invalid search location selected.');
            return;
        }

        if (!url) {
            console.error('No search option selected or invalid search query');
            return;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`Error: HTTP error! Status: ${response.status}`);
                try {
                    const errorData = await response.json();
                    console.error('Error Data:', errorData);
                } catch (jsonError) {
                    console.error('Could not parse error response as JSON:', jsonError);
                }
                return;
            }

            const data = await response.json();
            console.log('Fetched data:', data);

            if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
                console.warn('No results found.');
                navigate(`/restaurant-details?searchQuery=${trimmedSearchQuery}&location=${selectedLocation}`, {
                    state: { results: null, noResults: true },
                });
                return;
            }

            navigate(`/restaurant-details?searchQuery=${trimmedSearchQuery}&location=${selectedLocation}`, {
                state: { results: data },
            });

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
                        <select
                            className="location-dropdown"
                            value={selectedLocation}
                            onChange={handleLocationChange}
                        >
                            <option value="id">Search by ID</option>
                            <option value="name">Search by Name</option>
                            <option value="location">Search by Location</option>
                        </select>
                    </div>
                    <div className="header-searchbar">
                        <input
                            placeholder="search for restaurant, cuisine or a dish"
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
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <button className="login-button" onClick={handleLoginClick}>
                                Login
                            </button>
                            <button className="signup-button" onClick={handleSignUpClick}>
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
