import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSocket } from './store/actions/actions'

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
