import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as $ from 'jquery'
import autosize from 'autosize';
import { sendMessage, setMessage, setChatWith } from '../store/actions/actions';
import { SEND_MESSAGE, TYPING, SEND_PMESSAGE } from '../CONSTANTS';
import moment from 'moment';

class MessageContainer extends Component {

    componentDidMount() {
        autosize(this.messagearea);
    }

    handleChange = (e) => {
        this.props.setMessage(e.target.value)
        this.props.socket.emit(TYPING, this.props.user.nickname);
    }

    containsObject = (obj, list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
    }

    handleClick = (e) => {
        const { user, socket, sendMessage, message, chatWith, setMessage, onlineUsers, setChatWith } = this.props;
        let dest, messageTemplate = {
            sender: user.nickname,
            date: moment().format('D/MMM - hh:mm a'),
            content: message
        };

        if (message.length) {
            if (chatWith.socketID) {
                if (this.containsObject(chatWith, onlineUsers)) {
                    dest = chatWith.nickname;
                    socket.emit(SEND_PMESSAGE, { reciver: chatWith.socketID, content: messageTemplate });
                    sendMessage(dest, messageTemplate);
                } else {
                    this.deletedUser = {
                        nickname: chatWith.nickname,
                        condition: true
                    }
                    this.messagearea.disabled = true;
                    setTimeout(_ => {
                        this.deletedUser.condition = false;
                        this.messagearea.disabled = false;
                        setChatWith({});
                    }, 3000)
                }

            } else {
                dest = 'global';
                socket.emit(SEND_MESSAGE, messageTemplate);
                sendMessage(dest, messageTemplate);
            }
            setMessage('');
            this.messagearea.focus();
            $('.message-area').animate({
                scrollTop: $('.message-area')[0].scrollHeight
            }, 500);
            $('textarea').height('32px');
        }
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            this.handleClick(e);
        }
    }

    deletedUser = {
        nickname: '',
        condition: false
    }

    render() {
        const { messages, user, typing, chatWith, message } = this.props;
        let messageArray = chatWith.nickname ? messages[chatWith.nickname] : messages['global'];
        return (
            <article className="message-container">
                <section className="message-area">
                    {
                        messageArray ? (
                            messageArray.map((message, index) => {
                                return (
                                    <div key={index} className={`message ${message.sender === user.nickname ? 'right' : ''}`}>
                                        <h2 className="message-sender">{message.sender}</h2>
                                        <p className="message-content" dir="auto">{message.content}</p>
                                        <span className="message-time">{message.date}</span>
                                    </div>
                                )
                            })
                        ) : null
                    }
                    {
                        this.deletedUser.condition === true ? <div className="deleted-user">{this.deletedUser.nickname} is no longer available</div> : null
                    }
                </section>
                <section className="person-typing">{chatWith.nickname ? (
                    typing.split(' ')[0] === chatWith.nickname ? typing : null
                ) : typing}</section>
                <section className="message-typing">
                    <textarea
                        placeholder="Enter message..."
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        ref={i => this.messagearea = i}
                        rows="1" dir="auto"
                        value={message}></textarea>
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
        onlineUsers: state.onlineUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (dest, content) => { dispatch(sendMessage(dest, content)) },
        setMessage: (val) => { dispatch(setMessage(val)) },
        setChatWith: (user) => { dispatch(setChatWith(user)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer)