/* global location */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import store from './redux';
import './App.scss';
import logo from 'logo.png';
//import { Menu, Icon } from 'antd';
import Menu from 'containers/MenuContainer';
import Recently from 'containers/RecentlyContainer';
import Setting from 'containers/SettingContainer';

const sagaMiddleware = createSagaMiddleware();

const reduxstore = createStore(
  store, 
  applyMiddleware(sagaMiddleware)
);

//sagaMiddleware.run(helloSaga);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page : 'setting'
    };

    this.setPage = this.setPage.bind(this);
  }

  getPage = () => {
    let query = new URLSearchParams(window.location.search)
    let page = query.get('page');

    if (!page) return 'setting';
    switch(page) {
      case 'setting':
        return 'setting';
      case 'recently':
        return 'recently';
      default:
        return 'setting';
    }
  }

  setPage = (page) => {
    this.setState({
      page,
    })
    window.history.pushState('', `${page}`, `?page=${page}`);
  }

  componentDidMount() {
    let page = this.getPage();
    if ( this.state.page !== page ) {
      this.setPage(page);
    }
  }


  render() {

    return (
      <Provider store={reduxstore} >
        <div className="App">
          <header className="App-header">
            <div className="App-logo">
              { /*<img src={logo} />*/ }
              중국어사전 관리자 페이지
            </div>
            <Menu 
              page={this.state.page}
              setPage={this.setPage}
            ></Menu>
          </header>
          <div className="App-main">
            { this.state.page === 'setting' && <Setting></Setting> }
            { this.state.page === 'recently' && <Recently></Recently> }
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
