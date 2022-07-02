import { useContext } from "react";
import { Redirect,Route } from "react-router-dom";
import { authContext } from "./Auth";
function ProtectedRoute({ component:Component, ...rest }) {
    const Auth = useContext(authContext)
    return (
      <Route
        {...rest}
        render={() => {
          return Auth.authenticated === true ? <Component/> : <Redirect to="/register" />;
        }}
      />
    );
  }

  export default ProtectedRoute;