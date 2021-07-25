import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import connectToDb from "./db/index";
import routes from "./routes/index";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swaggerConfig";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import config from "./config";
import { errorHandler } from "./errorHandlers";

const app = express();
const port = config.port;
const server = app.listen(port, () =>
  console.log(`listening on port ${port}...`)
);
const io = new Server(server);
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.set("socketio", io);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan("tiny"));

connectToDb();

app.use(routes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("sign-user", (authInfo) => {
    app.set("authInfo", authInfo);
  });
});
