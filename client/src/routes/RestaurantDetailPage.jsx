import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReview from "../components/AddReview";
import { Reviews } from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  // console.log(selectedResto);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder(`/${id}`);
        setSelectedRestaurant(response.data.data);
        // console.log(result);
        // console.log(selectedRestaurant);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  console.log(selectedRestaurant);
  // selectedRestaurant && console.log(selectedRestaurant);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restos.name}
          </h1>
          <div className="text-center">
            <StarRating
              rating={selectedRestaurant.restos.average_rating}
            ></StarRating>
            <span className="text-warning">
              {selectedRestaurant.restos.count
                ? `(${selectedRestaurant.restos.count})`
                : `(0)`}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews}></Reviews>
          </div>
          <AddReview></AddReview>
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
