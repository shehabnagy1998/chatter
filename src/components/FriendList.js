import React from 'react'
import { connect } from 'react-redux'
import { setChatWith } from '../store/actions/actions';
import * as $ from 'jquery'

const FriendList = ({ onlineUsers, user, setChatWith }) => {

    const handleClick = (friend) => {
        setChatWith(friend);
        $('.main-menu').toggleClass('active');
    }

    return (
        <section className="friend-list">
            {onlineUsers.map((friend, index) => {
                return user.nickname !== friend.nickname ? (
                    <div key={index} className="friend" onClick={_ => handleClick(friend)}>
                        <span>{friend.userLetter}</span>
                        <h3>{friend.nickname}</h3>
                    </div>
                ) : ''
            })
            }
        </section>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setChatWith: (user) => { dispatch(setChatWith(user)) },
    }
}


export default connect(null, mapDispatchToProps)(FriendList)
