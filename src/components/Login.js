import React, { Component } from 'react'
import { connect } from 'react-redux'
import { verifiyUser, setNickname } from '../store/actions/actions';

class Login extends Component {

    handleChange = (e) => {
        this.props.setUser(e.target.value);
    }

    handleClick = (e) => {
        this.props.verifiyUser(this.props.history)
    }

    handleKeyPress = e => {
        if (e.charCode === 13) {
            e.preventDefault();
            this.handleClick(e);
        }
    }

    render() {
        const { error } = this.props;
        return (
            <article className="login-container">
                <section className="login-content">
                    <h1 className="title">got a nickname ?</h1>
                    <div>
                        <input
                            type="text"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                            placeholder="Enter nickname..." />
                        <p>{error}</p>
                    </div>
                    <button onClick={this.handleClick} className="btn btn-primary">Log in</button>
                </section>
            </article>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (nickname) => { dispatch(setNickname(nickname)) },
        verifiyUser: (nickname) => { dispatch(verifiyUser(nickname)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)