import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as $ from 'jquery'
import autosize from 'autosize';
import { sendMessage, setMessage } from '../store/actions/actions';
import { SEND_MESSAGE, TYPING, SEND_PMESSAGE } from '../CONSTANTS';
import moment from 'moment';

class MessageContainer extends Component {

    componentDidMount() {
        this.inter = setInterval(_ => {
            this.jMethods();
        }, 1000);
        autosize(this.messagearea);
    }

    jMethods = _ => {
        let screenHeight = $(window).innerHeight();
        let navbarHeight = $('.page-navbar').innerHeight();
        let requiredHeight = screenHeight - navbarHeight;
        $('.message-container').height(requiredHeight);
    }

    handleChange = (e) => {
        this.props.setMessage(e.target.value)
        this.props.socket.emit(TYPING, this.props.user.nickname);
    }

    handleClick = (e) => {
        const { user, socket, sendMessage, message, chatWith } = this.props;
        let messageTemplate = {
            sender: user.nickname,
            date: moment(new Date().toString()).format('D/MMM - hh:mm a'),
            content: message
        }
        chatWith.socketID ? socket.emit(SEND_PMESSAGE, { reciver: chatWith.socketID, content: messageTemplate })
            : socket.emit(SEND_MESSAGE, messageTemplate);
        let dest = chatWith.nickname ? chatWith.nickname : 'global';
        sendMessage(dest, messageTemplate);
        this.messagearea.value = '';
        this.messagearea.focus();
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            this.handleClick(e);
        }
    }

    render() {
        const { messages, user, typing, chatWith } = this.props;
        let messageArray = chatWith.nickname ? messages[chatWith.nickname] : messages['global'];
        // console.log(messageArray);
        return (
            <article className="message-container">
                <section className="message-area">
                    {
                        messageArray ? (
                            messageArray.map((message, index) => {
                                return (
                                    <div key={index} className={`message ${message.sender === user.nickname ? 'right' : ''}`}>
                                        <h2 className="message-sender">{message.sender}</h2>
                                        <p className="message-content">{message.content}</p>
                                        <span className="message-time">{message.date}</span>
                                    </div>
                                )
                            })
                        ) : null
                    }
                </section>
                <section className="person-typing">{chatWith.nickname ? null : typing}</section>
                <section className="message-typing">
                    <textarea
                        placeholder="Enter message..."
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        ref={i => this.messagearea = i}
                        rows="1" dir="auto"></textarea>
                    <button className="btn btn-primary" onClick={this.handleClick}><i className="material-icons">send</i></button>
                </section>
            </article>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        user: state.user,
        message: state.message,
        socket: state.socket,
        typing: state.typing,
        chatWith: state.chatWith,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (dest, content) => { dispatch(sendMessage(dest, content)) },
        setMessage: (val) => { dispatch(setMessage(val)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer)