import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

function UpdateResto(props) {
  const { id } = useParams();
  let history = useHistory();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price range");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        // console.log(response);
        // console.log(response.data.data.restos.name);
        // console.log(response.data.data.restos.location);
        // console.log(response.data.data.restos.price_range);
        setName(response.data.data.restos.name);
        setLocation(response.data.data.restos.location);
        setPriceRange(response.data.data.restos.price_range);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    history.push("/");
  };
  return (
    <div>
      <form action="">
        <div className="form-group col-md-3 offset-md-4">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
            autoComplete="off"
          />
        </div>
        <div className="form-group col-md-3 offset-md-4">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="name"
            className="form-control"
            type="text"
            autoComplete="off"
          />
        </div>
        <div className="form-group col-md-3 offset-md-4">
          <label htmlFor="location">Price range</label>
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
        <div className=" col-md-3 offset-md-4">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateResto;
