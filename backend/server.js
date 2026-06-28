const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let reviews = [
  {
    id: 1,
    guest: "Rahul",
    rating: 5,
    review: "Amazing stay",
    sentiment: "Positive",
  },
  {
    id: 2,
    guest: "Priya",
    rating: 3,
    review: "Average experience",
    sentiment: "Neutral",
  },
];

app.get("/", (req, res) => {
  res.json({
    message: "Homestay AI Backend is Running 🚀",
  });
});

app.get("/api/reviews", (req, res) => {
  res.status(200).json(reviews);
});


// SEARCH Reviews
app.get("/api/reviews/search", (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      message: "Search query is required",
    });
  }

  const result = reviews.filter(
    (r) =>
      r.guest.toLowerCase().includes(query.toLowerCase()) ||
      r.review.toLowerCase().includes(query.toLowerCase()) ||
      r.sentiment.toLowerCase().includes(query.toLowerCase())
  );

  res.status(200).json(result);
});

// GET Review by ID
app.get("/api/reviews/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const review = reviews.find((r) => r.id === id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  res.status(200).json(review);
});


// POST Add Review
app.post("/api/reviews", (req, res) => {
  const { guest, rating, review, sentiment } = req.body;

  // Validation
  if (!guest || !rating || !review || !sentiment) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const newReview = {
    id: reviews.length + 1,
    guest,
    rating,
    review,
    sentiment,
  };

  reviews.push(newReview);

  res.status(201).json({
    message: "Review added successfully",
    data: newReview,
  });
});

// PUT Update Review
app.put("/api/reviews/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const review = reviews.find((r) => r.id === id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  const { guest, rating, review: reviewText, sentiment } = req.body;

  review.guest = guest || review.guest;
  review.rating = rating || review.rating;
  review.review = reviewText || review.review;
  review.sentiment = sentiment || review.sentiment;

  res.status(200).json({
    message: "Review updated successfully",
    data: review,
  });
});

// DELETE Review
app.delete("/api/reviews/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const review = reviews.find((r) => r.id === id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  reviews = reviews.filter((r) => r.id !== id);

  res.status(200).json({
    message: "Review deleted successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});