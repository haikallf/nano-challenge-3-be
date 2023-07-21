const express = require("express");
const { spawn } = require("child_process");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const server = http.Server(app);
const io = socketIO(server);

io.sockets.setMaxListeners(20);

// Socket.io event handlers
const reportHandler = require("./socket/handlers/reportHandler"); //delete this line
const notificationHandler = require("./socket/handlers/notificationHandler");
const coordinateHandler = require("./socket/handlers/coordinateHandler");
const userCoordinateHandler = require("./socket/handlers/userCoordinateHandler");

// RESTful API routes
const allUserDetailRoutes = require("./api/routes/details/allUserDetails");
const allAdminDetailRoutes = require("./api/routes/details/allAdminDetails");
const userDetailRoutes = require("./api/routes/details/userDetails");
const adminDetailRoutes = require("./api/routes/details/adminDetails");

// Authentication routes
const userAuthRoutes = require("./api/routes/auth/userAuth");
const adminAuthRoutes = require("./api/routes/auth/adminAuth");

// Middleware
app.use(express.json());

// RESTful API routes
app.use("/user-detail/all", allUserDetailRoutes);
app.use("/admin-detail/all", allAdminDetailRoutes);
app.use("/user-detail", userDetailRoutes);
app.use("/admin-detail", adminDetailRoutes);
app.use("/auth/user", userAuthRoutes);
app.use("/auth/admin", adminAuthRoutes);

//for debugging purpose only
app.post("/restart", (req, res) => {
  // Restart the server using the 'spawn' method
  const restartCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const args = ["run", "start"]; // Change "start" to the actual script name if different
  const options = { detached: true, stdio: "ignore" };
  const restartProcess = spawn(restartCommand, args, options);
  restartProcess.unref();

  // Send a response indicating the server is restarting
  res.status(200).send("Server is restarting...");
});

// Socket.io configuration and event handlers
io.on("connection", (socket) => {
  reportHandler(socket);
  notificationHandler(socket);
  coordinateHandler(socket);
  userCoordinateHandler(socket);
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Example app running on http://localhost:${port}`);
});
