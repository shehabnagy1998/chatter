import React, { Component } from 'react'
import { connect } from 'react-redux'
import { verifiyUser, setNickname, setError } from '../store/actions/actions';

class Login extends Component {

    handleChange = (e) => {
        this.props.setNickname(e.target.value);
    }

    handleClick = (e) => {
        const { verifiyUser, nickname, setError, setNickname } = this.props;
        let newNick = nickname.replace(/\s/g, '');
        if (newNick.length <= 0) {
            setError('nickname is required');
            this.input.focus();
        } else {
            if (newNick.length >= 3) {
                setNickname(newNick);
                verifiyUser(this.props.history);
            } else {
                setError('nickname must be min 3 chars');
                this.input.focus();
            }
        }
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
                            placeholder="Enter nickname..."
                            maxLength="10"
                            ref={i => this.input = i}
                        />
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
        nickname: state.nickname,
        error: state.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNickname: (nickname) => { dispatch(setNickname(nickname)) },
        verifiyUser: (nickname) => { dispatch(verifiyUser(nickname)) },
        setError: (error) => { dispatch(setError(error)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)