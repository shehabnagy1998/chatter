import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { setSocket, setTyping, sendMessage, setUsers } from './store/actions/actions'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import MessageArea from './components/MessageArea'
import { RECIVE_MESSAGE, RECIVE_TYPING, RECIVE_ONLINE, RECIVE_PMESSAGE } from './CONSTANTS';
import * as $ from 'jquery'

class App extends Component {

  componentDidMount() {
    const { socketURL, setSocket, sendMessage, setTyping, setUsers } = this.props;
    const socket = io(socketURL);
    setSocket(socket);
    socket.on('connect', _ => {

      socket.on(RECIVE_MESSAGE, (message) => {
        sendMessage('global', message);
        $('.message-area').animate({
          scrollTop: $('.message-area')[0].scrollHeight
        }, 500);
      });

      socket.on(RECIVE_PMESSAGE, (msg) => {
        sendMessage(msg.dest, msg.cont);
        $('.message-area').animate({
          scrollTop: $('.message-area')[0].scrollHeight
        }, 500);
      });

      socket.on(RECIVE_TYPING, (nickname) => {
        setTyping(nickname + ' is typing');
        setTimeout(_ => { setTyping('') }, 2000)
      });

      socket.on(RECIVE_ONLINE, (onlineUsers) => {
        console.log(onlineUsers.length);
        setUsers(onlineUsers)
      });

    });
  }

  render() {
    return (
      <article className="App">
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
    sendMessage: (dest, cont) => { dispatch(sendMessage(dest, cont)) },
    setTyping: (val) => { dispatch(setTyping(val)) },
    setUsers: val => { dispatch(setUsers(val)) }
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
