import React, { Component, Fragment } from 'react'
import Navbar from './Navbar';
import { connect } from 'react-redux'
import MessageContainer from './MessageContainer';
import SideMenu from './SideMenu';

class MessageArea extends Component {
    constructor(props) {
        super(props);
        if (this.props.user.nickname === undefined) {
            this.props.history.push('/')
        }
    }

    componentWillUnmount() {
        clearInterval(this.inter);
    }

    render() {
        document.title = `Chatter | ${this.props.user.nickname}`
        return (
            <Fragment>
                <article className="main-container">
                    <SideMenu />
                    <section className="main-content">
                        <Navbar />
                        <MessageContainer />
                    </section>
                </article>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        socket: state.socket
    }
}

export default connect(mapStateToProps)(MessageArea)