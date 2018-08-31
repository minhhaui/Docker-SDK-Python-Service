import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login'
import User from './pages/User';
import Navbar from './components/Navbar';
import CheckLogin from './components/CheckLogin';
import UserCreate from './pages/UserCreate'
import UserEdit from './pages/UserEdit';
import UserDetail from './pages/UserEdit';

import Image from './pages/Image';
import ImageCreate from './pages/ImageCreate'
import ImageDetail from './pages/ImageDetail';
import ImageEdit from './pages/ImageEdit';

import Container from './pages/Container';
import ContainerEdit from './pages/ContainerEdit';
import ContainerCreate from './pages/ContainerCreate';
// import ContainerDetail from './pages/ContainerDetail';
// redux
import { Provider } from 'react-redux'
import configureStore from './store/config'


export const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar/>

            <div className="container-fluid">
              <div className="row">
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="mr-t-10"></div>
                  <Switch>
                    <Route exact path="/login" component={Login} />

                    <Route exact path="/" component={User} />
                    <Route exact path="/users" component={User} />
                    <Route exact path="/users/create" component={UserCreate} />
                    <Route exact path="/users/edit/:id" component={UserEdit} />
                    <Route exact path="/users/detail/:id" component={UserDetail} />

                    <Route exact path="/images" component={Image} />
                    <Route exact path="/images/create" component={ImageCreate} />
                    <Route exact path="/images/detail/:id" component={ImageDetail} />
                    <Route exact path="/images/edit/:id" component={ImageEdit} />

                    <Route exact path="/containers" component={Container} />
                    <Route exact path="/containers/create" component={ContainerCreate} />
                    <Route exact path="/containers/edit/:id" component={ContainerEdit} />
                  </Switch>
                </div>
              </div>
            </div>

            <CheckLogin/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
