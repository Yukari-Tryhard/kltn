import { useEffect, useState } from 'react';
// import { CallFlowUserClient } from '../api/web-api-client.ts';

const useAuthen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = localStorage.getItem('AccessToken');

      if (accessToken) {
        // const CallFlowClient = new CallFlowUserClient('https://localhost:7153');

        try {
          // let data = await CallFlowClient.getUserData('Bearer ' + accessToken);
          // setUser(data);

        } catch (error) {
          console.error('Error validating access token:', error);
          window.location.assign('https://localhost:44421/signin');
        }
      } else {
        window.location.assign('https://localhost:44421/signin');
      }
    };

    checkTokenValidity();
}, []);

return user;
};

export default useAuthen;
