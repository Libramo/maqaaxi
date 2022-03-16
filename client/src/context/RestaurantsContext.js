import React, { useState, createContext } from "react";
// import RestaurantDetailPage from "../routes/RestaurantDetailPage";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  //This function adds the ne restaurant to the database "YELP"
  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  //
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
