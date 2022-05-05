import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import Skeleton from "@mui/material/Skeleton";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const [loading, setLoading] = useState(true);
  const skeletonArray = Array(10).fill("");

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restos);
      } catch (err) {
        console.log(err);
        // console.log("liban");
        setLoading(true);
      }
    }
    fetchData();
  }, []);

  let history = useHistory();

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };
  // console.log(restos);
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((resto) => {
          return resto.id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.id}></StarRating>
        <span className="text-warning">({restaurant.count})</span>
      </>
    );
  };
  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((resto) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(resto.id)}
                  key={resto.id}
                >
                  <td>{resto.name}</td>
                  <td>{resto.location}</td>
                  <td>{"$".repeat(resto.price_range)}</td>
                  <td>{renderRating(resto)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, resto.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, resto.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
