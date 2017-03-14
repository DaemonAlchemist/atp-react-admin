import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from 'redux/modules/list';
import List from 'components/List';

class ArticleList extends Component {
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.object).isRequired
    }
    componentDidMount() {
        const { actions } = this.props;
        const { getList } = actions;
        getList();
    }
    render() {
        const { list } = this.props;
        return <List title="Article List" list={list} />;
    }
}

function mapStateToProps(state) {
    return { list: state.list };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            actions,
            dispatch
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
