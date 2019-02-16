/* global location */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import store from 'store';
import './App.scss';
import { Icon } from 'antd';
import Menu from 'containers/MenuContainer';
import Recently from 'containers/RecentlyContainer';
import Setting from 'containers/SettingContainer';
import Notice from 'containers/NoticeContainer';

const sagaMiddleware = createSagaMiddleware();

const reduxstore = createStore(
  store, 
  applyMiddleware(sagaMiddleware)
);

//sagaMiddleware.run(rootSaga);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page : 'notice'
    };

    this.setPage = this.setPage.bind(this);
  }

  getPage = () => {
    let query = new URLSearchParams(window.location.search)
    let page = query.get('page');

    if (!page) return 'notice';
    return page;
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
              네이버 중국어 사전
            </div>
            <Menu 
              page={this.state.page}
              setPage={this.setPage}
            ></Menu>
            <div className="App-header-footer">
              <a href="https://github.com/pelogvc/ChineseDictionaryChromeExtension" target="_blank" without rel="noopener noreferrer">
              <Icon type="github" />
              pelogvc
              </a>
            </div>
          </header>
          <div className="App-main">
            { this.state.page === 'notice' && <Notice></Notice> }
            { this.state.page === 'setting' && <Setting></Setting> }
            { this.state.page === 'recently' && <Recently></Recently> }
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
