import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { users} from '../config/users';

export function Login() {
    const history = useHistory();
    const location = useLocation();
    let [ selected, setSelected ] = useState<any>();

    const selectUser = (e: any) => {
      setSelected(e.target.value);
    }

    const signIn = () => {
        if (!selected) {
            return;
        }

        localStorage.setItem('userId', selected);
        history.push('/boards');
    }

    useEffect(() => {
      const user = localStorage.getItem('userId');

      if (user) {
        history.push('/boards');
      }
    }, []);

    
    return (
      <div className="login-box">
        <select onChange={selectUser}>
          <option disabled selected> Select User To Login </option>
            {users.map((user: any) => (
                <option value={user.id}>{user.name}</option>
            ))}
        </select>
        <button onClick={signIn}>Login</button>
      </div>
    )
}