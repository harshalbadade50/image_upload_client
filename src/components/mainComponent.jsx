import React, { Component } from 'react';
import { connect } from 'react-redux';

import SelectImage from './imageLoader.jsx';

class MainComponent extends Component {
    render() {
        return (
            <div>
                <SelectImage />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
}

const MainComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainComponent);

export default MainComponentContainer;