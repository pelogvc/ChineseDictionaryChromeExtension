import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recentlyAction from 'store/Recently';
import Recently from 'components/Recently/Recently';
import { drawHtml } from 'lib/utils';


class RecentlyContainer extends Component {
    constructor(props) {
        super(props);

        this.getList = this.getList.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
    }
    /*
    getList = (page) => {
        page = page || 1;
        this.props.RecentlyAction.listRequest(page);
    }
    */
    getList = () => {
        this.props.RecentlyAction.listRequest();
    }

    changeCurrentPage = (page) => {
        this.props.RecentlyAction.listCurrentPage(page);
    }

    componentDidMount() {
        //this.getList(1);
        this.getList();
    }

    shouldComponentUpdate(newProps, nextState) {
        if ( this.props === newProps ) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <Recently 
                changeCurrentPage={this.changeCurrentPage}
                loading={this.props.loading}
                list={this.props.list}
                data={drawHtml(this.props.list)}
                pageCount={this.props.pageCount}
                currentPage={this.props.currentPage}
            />
        );
    }
}

export default connect(
    (state) => ({
        list: state.Recently.list,
        loading: state.Recently.loading,
        pageCount: state.Recently.pageCount,
        currentPage: state.Recently.currentPage,
    }),
    (dispatch) => ({
        RecentlyAction: bindActionCreators(recentlyAction, dispatch),
    })
)(RecentlyContainer);