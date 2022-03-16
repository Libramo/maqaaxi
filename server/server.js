require("dotenv").config();
const express = require("express");
// const { Sequelize, DataTypes } = require("sequelize");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const app = express();
const pathName = require("path");
////loooooooooooooooLLLLLLLLLLLLLLL

// app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static(pathName.join(__dirname, "client/build")));
// app.use(express.static("public"));

//************************************ (READ) Getting all restaurant *********************************************
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    // const result = await db.query("select * from restaurants;");
    const restaurantRatingData = await db.query(
      "select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );

    console.log(restaurantRatingData.rows);
    res.status(200).json({
      status: " success",
      results: restaurantRatingData.rows.length,
      data: {
        restos: restaurantRatingData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//************************************ CREATE a restaurant *********************************************
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *;",
      [req.body.name, req.body.location, req.body.price_range]
    );
    // console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        restos: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//************************************/ (READ) Get one specific restaurant********************************************
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const allRestaurants = await db.query(
      "select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id=$1;",
      [req.params.id]
    );
    const allReviews = await db.query(
      "select * from reviews where restaurant_id = $1;",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restos: allRestaurants.rows[0],
        reviews: allReviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//************************************/ UPDATE one specific restaurant********************************************
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *;",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restos: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//************************************/ DELETE one specific restaurant********************************************
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants where id = $1;", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

//************************************/ CREATE a new review ********************************************
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) RETURNING *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

port = process.env.PORT || 3021;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
// app.listen(process.env.PORT || 3030);
