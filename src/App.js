import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { setSocket, setTyping, sendMessage, setUsers } from './store/actions/actions'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import MessageArea from './components/MessageArea'
import { RECIVE_MESSAGE, RECIVE_TYPING, RECIVE_ONLINE, RECIVE_PMESSAGE } from './CONSTANTS';
import * as $ from 'jquery'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import notification from './assets/sound.ogg'

class App extends Component {

  componentDidMount() {
    const { socketURL, setSocket, sendMessage, setTyping, setUsers } = this.props;
    const socket = io(socketURL);
    setSocket(socket);
    socket.on('connect', _ => {

      socket.on(RECIVE_MESSAGE, (msg) => {
        sendMessage('global', msg);
        this.recivingMsg();
      });

      socket.on(RECIVE_PMESSAGE, (msg) => {
        sendMessage(msg.dest, msg.cont);
        this.recivingMsg();
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

  recivingMsg = _ => {
    const { sound, vibration, user } = this.props;
    $('.message-area').animate({
      scrollTop: $('.message-area')[0] ? $('.message-area')[0].scrollHeight : 0
    }, 500);
    if (sound === true && user.nickname) {
      new Audio(notification).play()
    }
    if (vibration === true && user.nickname) {
      navigator.vibrate(200);
    }
  }

  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={1000}
            classNames='fade'>
            <Switch location={location}>
              <Route path="/" exact component={Login}></Route>
              <Route path="/:nickname" component={MessageArea}></Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    socketURL: state.socketURL,
    sound: state.sound,
    vibration: state.vibration,
    user: state.user
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
