import React, { Component } from 'react'
import * as $ from 'jquery'
import { connect } from 'react-redux'
import FriendList from './FriendList';
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { setChatWith } from '../store/actions/actions';

class SideMenu extends Component {

    componentDidMount() {
        this.arrow = 'arrow_right'
        $('.friend-list').slideToggle();
    }

    handleShowOnline = _ => {
        this.arrow = this.arrow === 'arrow_right' ? 'arrow_drop_down' : 'arrow_right';
        $('.online').children('.material-icons').text(this.arrow);
        $('.friend-list').slideToggle();
    }

    handleLogout = (e) => {
        const { socket } = this.props;
        socket.disconnect();
        window.location.href = '/';
    }

    handleGlobalClick = _ => {
        this.props.setChatWith({});
        $('.main-menu').toggleClass('active');
    }

    render() {
        const { user, onlineUsers } = this.props;
        return (
            <article className="main-menu">
                <nav className="sidemenu-nav">
                    <button onClick={this.handleLogout} className="logof"><i className="material-icons">eject</i></button>
                    <button onClick={_ => { $('.main-menu').toggleClass('active'); }} className="menu-opener"><i className="material-icons">menu</i></button>
                </nav>
                <section className="profile">
                    <span>{user.userLetter}</span>
                    <h2>{user.nickname}</h2>
                </section>
                <section className="chat-types">
                    <button className="type" onClick={this.handleGlobalClick}>global <i className="material-icons">arrow_right</i></button>
                    <button className="type online" onClick={this.handleShowOnline}>online <i className="material-icons">arrow_right</i></button>
                    <FriendList onlineUsers={onlineUsers} user={user} />
                </section>
            </article>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        onlineUsers: state.onlineUsers,
        socket: state.socket
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setChatWith: (user) => { dispatch(setChatWith(user)) },
    }
}

const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(SideMenu)