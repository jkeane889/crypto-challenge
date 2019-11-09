// client/homepage.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Line } from 'react-chartjs-2';
import fetchPricesAction from 'fetchPrices';
import { getPrices, getPricesPending, getPricesError } from 'reducers';

import React from 'react';
import fetchPrices from '../src/redux/fetchPrices';

class Homepage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { fetchPrices: fetchPrices } = this.props;
        fetchPrices();
    }

    render() {
        const {prices, error, pending} = this.props;
        
        return (
            <div>
                <Line data={} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: getPricesError(state),
    prices: getPrices(state),
    pending: getPricesPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPrices: fetchPricesAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);

export default Homepage;