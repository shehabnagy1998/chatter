import React from 'react'
import { connect } from 'react-redux'
import { setChatWith } from '../store/actions/actions';
import * as $ from 'jquery'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const FriendList = ({ onlineUsers, user, setChatWith }) => {

    const handleClick = (friend) => {
        setChatWith(friend);
        $('.main-menu').toggleClass('active');
    }

    return (
        <TransitionGroup className="friend-list">
            {onlineUsers.map((friend, index) => {
                return user.nickname !== friend.nickname ? (
                    <CSSTransition
                        key={index}
                        timeout={1000}
                        classNames='fade'>
                        <div key={index} className="friend" onClick={_ => handleClick(friend)}>
                            <div>{friend.userLetter}</div>
                            <div>{friend.nickname}</div>
                        </div>
                    </CSSTransition>
                ) : ''
            })
            }
        </TransitionGroup>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setChatWith: (user) => { dispatch(setChatWith(user)) },
    }
}


export default connect(null, mapDispatchToProps)(FriendList)
