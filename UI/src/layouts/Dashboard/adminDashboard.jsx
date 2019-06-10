import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import Header from "../../components/AdminHeader/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/AdminSidebar";

import { style } from "../../variables/Variables.jsx";

import dashboardRoutes from "../../routes/adminDashboard.jsx";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null
    };
  }
  handleNotificationClick(position) {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }

    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to Admin <b>Resiliense Survey</b>
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 5
    });
  }
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Resiliense Survey</b> applicatiom
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 5
    });
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
                if (prop.name === "Login Page")
                {
                  prop.routes.map((prop, key) => {
                    return (
                      <Route
                        path={prop.path}
                        component={prop.component}
                        key={key}
                      />
                    );
                  });
                }
                else{
                  console.log(prop.path, prop.name, key)
                  return (
                    <Route exact
                      path={prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                }
                if (prop.name === "Notifications"){
                  console.log("Notify")
                  return (
                    <Route exact
                      path={prop.path}
                      key={key}
                      render={routeProps => (
                        <prop.component
                          {...routeProps}
                          handleClick={this.handleNotificationClick}
                        />
                      )}
                    />
                  );
                }
                if (prop.redirect)
                {
                  return <Redirect from={prop.path} to={prop.to} key={key} />;
                }
                return (
                  <Route exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              }
            )}
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
