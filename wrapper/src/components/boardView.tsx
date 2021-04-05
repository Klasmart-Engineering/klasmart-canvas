import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { users } from '../config/users';
import { AddUserTool } from './addUser';
import { Canvas } from './canvas';

export function BoardView() {
  let [ loggedUsers, setLoggedUser ] = useState<any>([]);
  let [ self, setSelf ] = useState<any>();
  const history = useHistory();
  let selfId = localStorage.getItem('userId');
  let [ userList, setUserList ] = useState<any>(users);
  
  const onAdd = (user: any) => {
    setLoggedUser([ ...loggedUsers, user ]);
  }
  
  const remove = (i: number) => {
    const toUserList = loggedUsers.find(((user: any, key: number) => key === i));
    setLoggedUser(loggedUsers.filter((user: any, key: number) => key !== i));
    setUserList([ ...userList, toUserList ]);
  }

  const signOut = () => {
    localStorage.clear();
    history.push('/login');
  }

  useEffect(() => {
    if (selfId && !self) {
      let selfUser = users.find((user: any) => user.id === selfId);
      setSelf(selfUser);
      setTimeout(() => {
        console.log(self);
      }, 500);
    } else if (!selfId) {
      history.push('/login');
    }
  }, [selfId, self]);

  useEffect(() => {
    if (self) {
      const current = userList
        .filter((user: any) => user.id !== self?.id && !loggedUsers.find((logged: any) => logged.id === user.id));
      
      setUserList(current);
      console.log('Current', current);
      console.log('logged: ', loggedUsers);
    }
  }, [self, loggedUsers]);

  return(
    <>
      {/* <label>{self?.name}</label> */}
      <button onClick={signOut}>Sign Out</button>
      {self?.id === 'teacher' && 
        <AddUserTool addUser={onAdd} users={userList}></AddUserTool>
      }

      <Canvas user={self}></Canvas>
      {loggedUsers.map((user: any, i: number) => (
        <>
          <button onClick={() => { remove(i)}}>Remove</button>
          <img src={user.avatarImg} /> <span>{user?.name}</span>
          <Canvas user={user}></Canvas>
        </>
      ))}
    </>
  );

}