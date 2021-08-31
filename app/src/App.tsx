import React, { FunctionComponent, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import SidebarLeft from "./components/Layout/SidebarLeft";
import Topbar from "./components/Layout/Topbar";
import { openSnackbarInfo } from "./redux/alertSlice";
import { logoutUser } from "./redux/userSlice";
import Content from "./routes/MainRoutes";

interface AppProps { };

const App: FunctionComponent<AppProps> = () => {

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  const history = useHistory();

  const handleLogoutClick = (e: MouseEvent<HTMLLinkElement>) => {
    e.preventDefault();

    if (user.loggedIn) {
      history.push("/home");
      dispatch(logoutUser(""));
      dispatch(openSnackbarInfo(`Successfully logged ${user.user?.username} out`));
    } else {
      history.push("/login");
    }

  };

  return (
    <React.Fragment>
      <Topbar onLoginLogoutClick={handleLogoutClick} isLoggedIn={user.loggedIn} />
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
