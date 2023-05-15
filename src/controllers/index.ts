import auth from "./auth";
import general from "./general";
import users from "./user";
export default [
  {
    path: "/",
    module: general,
  },
  {
    path: "/auth",
    module: auth,
  },
  {
    path: "/users",
    module: users,
  },
];
