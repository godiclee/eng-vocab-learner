import { useState, useEffect } from 'react';

import Wrapper from './Components/Wrapper';

import Main from './Containers/Main';
import Signin from './Containers/Signin';





function App() {
  const [signedIn, setsignedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <Wrapper>
      {signedIn ? <Main></Main> : <Signin></Signin>}
    </Wrapper>
  )


}

export default App;


/*06-25 add backend package */