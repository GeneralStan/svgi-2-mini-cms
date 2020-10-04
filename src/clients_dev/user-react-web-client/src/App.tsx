import React from 'react';
import App2 from './App2'

/**
 * Here, we take for granted that on initialization, 
 * jwt token string may be sent by the server, if there is valid login
 * To get the userinfo and roles from the token, 
 * we can use https://github.com/auth0/jwt-decode
 */
type Props = {
  jwtToken?: string
}

const App: React.FC<Props> = ({jwtToken}) => {
  return (
    <div >
      <p>
        This content was sent from the React component.
        The flow is now ready for further react-based client development.
      </p>
      <p>
        The passed token is: <strong>{jwtToken}</strong>
      </p>
      <App2 />
      
    </div>
    
  );
}

export default App;