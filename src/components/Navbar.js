import React, { Component } from 'react'
import './Styling.scss'
import * as $ from 'jquery'
import { connect } from 'react-redux'

class Navbar extends Component {

    render() {
        const { chatWith } = this.props
        return (
            <nav className="page-navbar">
                <button onClick={_ => { $('.main-menu').toggleClass('active'); }} className="menu-opener"><i className="material-icons">menu</i></button>
                <h1 className="page-title">{
                    chatWith.nickname ? (chatWith.nickname) : 'Chatter'
                }</h1>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chatWith: state.chatWith
    }
}

export default connect(mapStateToProps)(Navbar)
