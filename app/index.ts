import app from "./server";

// process.env['GOOGLE_APPLICATION_CREDENTIALS'] = './config/gcloud.json';

app.listen(process.env.PORT || 8080, () =>
  console.log("Server running on http://localhost:8080")
);
