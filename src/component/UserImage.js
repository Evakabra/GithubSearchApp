import React from 'react';

function userImage(props) {
    return (
        <div>
            <img src={props.userIMG} width="70%" className='img-thumbnail float-right' alt="profile pic"/>
        </div>
    );
}

export default userImage;