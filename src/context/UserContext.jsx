import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
  userRole: '',
});

// 위에서 생성한 Context를 제공하는 Provider 선언.
// 이 Provider를 통해 자식 컴포넌트(Consumer)에게 인증 상태와 관련된 값, 함수를 전달할 수 있음.
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  // 로그인 시 실행할 핸들러
  const loginHandler = (loginData) => {
    // 백엔드가 응답한 JSON 인증 정보를 클라이언트쪽에 보관하자.
    localStorage.setItem('ACCESS_TOKEN', loginData.token);
    localStorage.setItem('USER_ID', loginData.id);
    localStorage.setItem('USER_ROLE', loginData.role);

    setIsLoggedIn(true);
    setUserRole(loginData.role);
  };

  // 첫 렌더링 시에 이전 로그인 정보를 확인해서 로그인 상태 유지 시키기.
  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem('USER_ROLE'));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogin: loginHandler,
        userRole,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
