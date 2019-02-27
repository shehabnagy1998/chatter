import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as $ from 'jquery'
import autosize from 'autosize';
import { sendMessage, setMessage } from '../store/actions/actions';
import { SEND_MESSAGE, TYPING } from '../CONSTANTS';
import moment from 'moment';

class MessageContainer extends Component {

    componentDidMount() {
        this.inter = setInterval(_ => {
            this.jMethods();
        }, 1000);
        autosize(this.message);
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
        let message = {
            sender: this.props.user.nickname,
            date: moment(new Date().toString()).format('D/MMM - hh:mm a'),
            content: this.props.message
        }
        this.props.socket.emit(SEND_MESSAGE, message);
        this.props.sendMessage(message);
        this.message.value = '';
        this.message.focus();
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            this.handleClick(e);
        }
    }

    render() {
        const { messages, user, typing } = this.props;
        return (
            <article className="message-container">
                <section className="message-area">
                    {
                        messages.map((message, index) => {
                            return (
                                <div key={index} className={`message ${message.sender === user.nickname ? 'right' : ''}`}>
                                    <h2 className="message-sender">{message.sender}</h2>
                                    <p className="message-content">{message.content}</p>
                                    <span className="message-time">{message.date}</span>
                                </div>
                            )
                        })
                    }
                </section>
                <section className="person-typing">{typing}</section>
                <section className="message-typing">
                    <textarea
                        placeholder="Enter message..."
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        ref={i => this.message = i}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (val) => { dispatch(sendMessage(val)) },
        setMessage: (val) => { dispatch(setMessage(val)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer)