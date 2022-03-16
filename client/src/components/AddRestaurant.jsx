import React, { useContext, useState } from "react";
import RestosFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestosFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurants(response.data.data.restos);
      console.log(response);
    } catch (err) {}
    ///
  };

  return (
    <div className="mb-2">
      <form action="">
        <div className="row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>
          <div className="col">
            <select
              className="custom-select"
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
              }}
            >
              <option disabled>Price range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col">
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
