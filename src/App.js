import { useState, createContext } from 'react';
import Wrapper from './Components/Wrapper';
import Main from './Containers/Main';
import Signin from './Containers/Signin';

const UserContext = createContext();

function App() {
  const saved_user = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(saved_user || { username: '', auth: false, last_login: '' });

  const signIn = (user, last_login) => {
    setUser({ username: user, auth: true, last_login: last_login });
    localStorage.setItem('user', JSON.stringify({ username: user, auth: true, last_login: last_login }));
  }

  const signOut = () => {
    setUser({ username: '', auth: false, last_login: '' });
    localStorage.setItem('user', JSON.stringify({ username: '', auth: false, last_login: '' }));
  }

  return (
    <Wrapper>
      <UserContext.Provider value={user}>
        {user.auth ? <Main signOut={signOut} /> : <Signin signIn={signIn} />}
      </UserContext.Provider>
    </Wrapper>
  )
}

export { App, UserContext };