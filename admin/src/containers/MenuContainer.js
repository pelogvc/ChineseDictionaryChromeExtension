import React, { Component } from 'react';
import Menu from 'components/Header/Menu';

class MenuContainer extends Component {
  render() {
    return (
      <div>
        <Menu
          page={this.props.page}
          setPage={this.props.setPage}
        />
      </div>
    );
  }
}

export default MenuContainer;