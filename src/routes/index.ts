import auth from "./authRoute";
import general from "./generalRoute";
import users from "./userRoute";
export default [
  {
    path: "/",
    module: general
  },
  {
    path: "/auth",
    module: auth
  },
  {
    path: "/users",
    module: users
  }
];
