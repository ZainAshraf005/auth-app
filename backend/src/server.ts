import app from "./app";
import { configData } from "./config/data";
import { connectDB } from "./db/db";

const PORT = configData.PORT;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
