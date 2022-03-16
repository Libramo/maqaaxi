import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");

  let history = useHistory();
  const location = useLocation();
  console.log(id);
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`${id}/addReview`, {
        name,
        rating,
        review: reviewText,
      });
    } catch (err) {
      console.log(err);
    }

    history.push("/");
    history.push(location.pathname);
  };
  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-goup col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="custom-select"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review"></label>
          <textarea
            id="review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <button
          onClick={handleSubmitReview}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
        {/* <div className="btn btn-primary">Submit</div> */}
      </form>
    </div>
  );
};

export default AddReview;
