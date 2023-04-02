import React, { useRef, useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const SearchBar = () => {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);
  const [maxPrice, setMaxPrice] = useState("");
  const [ingredient,setIngredient]=useState("");

  const handleClearCity = () => {
    setCity("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleClearMaxPrice = () => {
    setMaxPrice("");
  };

  const handleClearIngredient=()=>{
    setIngredient("");
  }

  const handleCityChange = async (event) => {
    const value = event.target.value;
    setCity(value);

    if (value.length >= 3) {
      try {
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": `${process.env.X_RapidAPI_Key}`,
            "X-RapidAPI-Host": "autocomplete-usa.p.rapidapi.com",
          },
        };

        const response = await fetch(
          `https://autocomplete-usa.p.rapidapi.com/marketplace/autocomplete/usa/cities/${value}`,
          options
        );
        const data = await response.json();
        const cities = data.Result;
        console.log(cities);

        // const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&appid=<your_api_key>`);
        // const data = await response.json();
        setSuggestions(cities);
        setShowSuggestions(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleIngredientChange=(event)=>{
    setIngredient(event.target.value);
  }

  const handleSuggestionClick = (suggestion) => {
    console.log("click city");
    setCity(suggestion);
    setSuggestions([]);
  };

  const handleClickOutside = (event) => {
    console.log("I am here");
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    // Do something with the zipcode and maxPrice values
    console.log(
      `Searching for listings with city ${city} and max price ${maxPrice}`
    );
    console.log(ingredient);
    if(ingredient) {
    Cookies.set('topic', ingredient);
    } else{
        Cookies.set('topic', "salmon and asparagus");
    }
    router.push("/result");
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <label className={styles.label}>City</label>
        <div className={styles.searchInputContainer} ref={wrapperRef}>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={handleCityChange}
          />
          {city && (
            <div className={styles.clearIcon} onClick={handleClearCity}>
              <FaTimes />
            </div>
          )}

          {showSuggestions && suggestions && suggestions.length > 0 && (
            <ul className={styles.suggestionList}>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.searchInputContainer}>
          <label className={styles.label}>Price</label>
          <input
            placeholder="Enter Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          {maxPrice && (
            <div className={styles.clearIcon} onClick={handleClearIngredient}>
              <FaTimes />
            </div>
          )}
        </div>

        <div className={styles.searchInputContainer}>
          <label className={styles.label}>Topic</label>
          <input
            placeholder="Enter the main Ingredient"
            value={ingredient}
            style={{width:"220px"}}
            onChange={handleIngredientChange}
          />
          {ingredient && (
            <div className={styles.clearIcon} onClick={handleClearIngredient}>
              <FaTimes />
            </div>
          )}
        </div>

        <div onClick={handleSearch}>
          <img className={styles.searchIcon} src="/SearchIcon.png" />
        </div>

        {/* <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button> */}
      </div>
      
      
    </div>
  );
};

export default SearchBar;
