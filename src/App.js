import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSocket } from './store/actions/actions'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import MessageArea from './components/MessageArea'

class App extends Component {

  static propTypes = {
    socketURL: PropTypes.string,
    setSocket: PropTypes.func
  }

  componentDidMount() {
    const { socketURL, setSocket } = this.props;
    const socket = io(socketURL);
    setSocket(socket);
    socket.on('connect', _ => { console.log(`connected successfully`); });
  }

  render() {
    return (
      <article className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact><Login /></Route>
          <Route path="/:user"><MessageArea /></Route>
        </Switch>
      </article>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    socketURL: state.socketURL
  }
}

const mapStateToDispatch = (dispatch) => {
  return {
    setSocket: val => { dispatch(setSocket(val)) }
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
