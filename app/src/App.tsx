import React, { FunctionComponent, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import SidebarLeft from "./components/Layout/SidebarLeft";
import Topbar from "./components/Layout/Topbar";
import { openSnackbarInfo } from "./redux/alertSlice";
import { logoutUser } from "./redux/userLoginSlice";
import Content from "./routes/MainRoutes";

interface AppProps { };

const App: FunctionComponent<AppProps> = () => {

  const dispatch = useAppDispatch();

  const login = useAppSelector((state) => state.loginUser);

  const history = useHistory();

  const handleLogoutClick = (e: MouseEvent<HTMLLinkElement>) => {
    e.preventDefault();

    if (login.loggedIn) {
      history.push("/home");
      dispatch(logoutUser());
      dispatch(openSnackbarInfo(`Successfully logged ${login.user?.username} out`));
    } else {
      history.push("/login");
    }

  };

  return (
    <React.Fragment>
      <Topbar onLoginLogoutClick={handleLogoutClick} isLoggedIn={login.loggedIn} />
      <div className="container mt-6">
        <div className="row justify-content-between">
          <div className="col-12 col-md-2">
            <div className="position-md-fixed">
              <SidebarLeft />
            </div>
          </div>
          <div className="col-12 col-md-10">
            <div className="container mt-2">
              <Content />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
