import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
    render() {
        return (
            <article className="login-container">
                <section className="login-content">
                    <h1 className="title">got a nickname ?</h1>
                    <div>
                        <input type="text" id="nickname" placeholder="Enter nickname" />
                        <p>username not available</p>
                    </div>
                    <button className="btn btn-primary">Log in</button>
                </section>
            </article>
        )
    }
}

export default connect()(Login)