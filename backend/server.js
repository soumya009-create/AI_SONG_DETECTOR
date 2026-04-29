const app = require("./src/app");
const connectionDb = require("./src/config/database");

const port = Number(process.env.PORT) || 3000;

connectionDb();

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
