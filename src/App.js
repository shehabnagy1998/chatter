import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSocket, setTyping, sendMessage } from './store/actions/actions'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import MessageArea from './components/MessageArea'
import { RECIVE_MESSAGE, RECIVE_TYPING } from './CONSTANTS';

class App extends Component {

  static propTypes = {
    socketURL: PropTypes.string,
    setSocket: PropTypes.func
  }

  componentDidMount() {
    const { socketURL, setSocket, sendMessage, setTyping } = this.props;
    const socket = io(socketURL);
    setSocket(socket);
    socket.on('connect', _ => { console.log(`connected successfully`); });
    socket.on(RECIVE_MESSAGE, (message) => {
      sendMessage(message)
    })
    socket.on(RECIVE_TYPING, (nickname) => {
      setTyping(nickname + ' is typing');
      setTimeout(_ => { setTyping('') }, 3000)
    })
  }

  render() {
    return (
      <article className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/:nickname" component={MessageArea}></Route>
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
    setSocket: val => { dispatch(setSocket(val)) },
    sendMessage: (val) => { dispatch(sendMessage(val)) },
    setTyping: (val) => { dispatch(setTyping(val)) },
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
