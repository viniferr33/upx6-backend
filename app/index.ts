import app from "./server";

app.listen(process.env.PORT || 8080, () =>
  console.log("Server running on http://localhost:8080")
);
