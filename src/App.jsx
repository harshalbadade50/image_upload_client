import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainComponent from './components/mainComponent.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <MainComponent />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
}

const AppContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;