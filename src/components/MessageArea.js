import React, { Component } from 'react'
import $ from 'jquery';
import autosize from 'autosize';

export default class MessageArea extends Component {

    componentDidMount() {
        this.setHeight();
    }

    setHeight = _ => {
        let screenHeight = $(window).innerHeight();
        let navbarHeight = $('.page-navbar').innerHeight();
        let requiredHeight = screenHeight - navbarHeight;
        $('.message-container').height(requiredHeight);

        autosize($('#message'));
    }

    render() {
        return (
            <article className="message-container">
                <section className="message-area">
                    <div className="message">
                        <h2 className="message-sender">shehab</h2>
                        <p className="message-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat delectus ipsam aut assumenda laudantium voluptates nesciunt minima consectetur, quia vero dolorem reprehenderit eveniet! Voluptatum dicta, iste dignissimos vero corrupti eum.</p>
                        <span className="message-time">20 Apr - 2:22 pm</span>
                    </div>
                    <div className="message right">
                        <h2 className="message-sender">shehab</h2>
                        <p className="message-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat delectus ipsam aut assumenda laudantium voluptates nesciunt minima consectetur, quia vero dolorem reprehenderit eveniet! Voluptatum dicta, iste dignissimos vero corrupti eum.</p>
                        <span className="message-time">20 Apr - 2:22 pm</span>
                    </div>
                    <div className="message">
                        <h2 className="message-sender">shehab</h2>
                        <p className="message-content">Lorem ipsum dolor</p>
                        <span className="message-time">20 Apr - 2:22 pm</span>
                    </div>
                    <div className="message right">
                        <h2 className="message-sender">shehab</h2>
                        <p className="message-content">Lorem ipsum dolor</p>
                        <span className="message-time">20 Apr - 2:22 pm</span>
                    </div>
                </section>
                <section className="person-typing"></section>
                <section className="message-typing">
                    <textarea placeholder="Enter message..." id="message" rows="1" dir="auto"></textarea>
                    <button className="btn btn-primary"><i className="material-icons">send</i></button>
                </section>
            </article>
        )
    }
}
