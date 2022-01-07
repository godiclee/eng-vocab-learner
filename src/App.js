import { useState, createContext } from 'react';
import Wrapper from './Components/Wrapper';
import Main from './Containers/Main';
import Signin from './Containers/Signin';

const UserContext = createContext();

function App() {
  const saved_user = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(saved_user || { userObject: '', auth: false });
  
  const signIn = (user) => {
    setUser({ userObject: user, auth: true });
    localStorage.setItem('user', JSON.stringify({ userObject: user, auth: true }));
  }

  const signOut = () => {
    setUser({ userObject: '', auth: false });
    localStorage.setItem('user', JSON.stringify({ userObject: '', auth: false }));
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