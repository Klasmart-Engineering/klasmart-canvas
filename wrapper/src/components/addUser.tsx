import React from 'react';

export const AddUserTool = (props: { users: any[], addUser: (user:any) => void }) => {
    const { users, addUser } = props;

    return(
        <div>
            <label>User List</label>: 
            {users.map((user: any) => (
                <><span className="user-select" onClick={() => {addUser(user)}}>{user.name}</span></>
            ))}
        </div>
    );
}
