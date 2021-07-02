import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../store/actions';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // Fire Action for Remove all Item from localstorage and redirect to login page
        this.props.logoutUser(this.props.history);
    }

    render() {
        return (
            <>
                <h1>&nbsp;</h1>
            </>
        );
    }
}

export default withRouter(connect(null, { logoutUser })(Logout));
