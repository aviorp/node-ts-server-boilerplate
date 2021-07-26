import generalRoutes from "./generalRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";

export default [
  { path: "/", module: generalRoutes },
  { path: "/auth", module: authRoutes },
  { path: "/users", module: userRoutes },
];
