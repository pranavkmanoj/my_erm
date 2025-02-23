// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = ({ allowedRoles }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/" />;
//   }

//   return <Outlet />;
// };

// export default PrivateRoute;
