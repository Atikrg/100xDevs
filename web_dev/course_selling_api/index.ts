import app from "./app";
import { prisma } from "./db";

const PORT = process.env.SERVER_PORT;


app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
})