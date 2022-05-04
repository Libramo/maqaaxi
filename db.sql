CREATE DATABASE yelp;

CREATE TABLE restaurants(
    id BIGSERIAL not null primary key,
    name VARCHAR(50) not null,
    location VARCHAR(50) not null,
    price_range INT not null check (price_range >= 1 and price_range <= 5)
);

CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5)
);

INSERT INTO restos (id, name, location, price_range) values (12, 'Mc Donald', 'balbala', 5);

SELECT * from restaurants
    left join 
    (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews 
    ON restaurants.id = reviews.restaurant_id;