// 여기에서 axios 인스턴스를 생성하고,
// interceptor 기능을 활용하여, access token이 만료되었을 때 refresh token을 사용하여
// 새로운 access token을 발급받는 비동기 방식의 요청을 모듈화. (fetch는 interceptor 기능 x)
// axios 인스턴스는 token이 필요한 모든 요청에 활용 될 것입니다.

import axios from 'axios';

// Axios 인스턴스 생성
// 이제부터 토큰이 필요한 요청은 그냥 axios가 아니라 지금 만드는 이 인스턴스로 보내겠다.
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
Axios Interceptor는 요청 또는 응답이 처리되기 전에 실행되는 코드입니다.
요청을 수정하거나, 응답에 대한 결과 처리를 수행할 수 있습니다.
*/

// 요청용 인터셉터
// 인터셉터의 use함수는 매개값 두 개 받습니다. 둘 다 콜백 함수 형식입니다.
// 1번째 콜백에는 정상 동작 로직, 2번째 콜백에는 과정 중 에러 발생 시 실행할 함수
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 보내기 전에 항상 처리해야 할 내용을 콜백으로 전달.
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error); // reject가 호출되면 비동기 함수가 취소됨.
  },
);

// 응답용 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 응답에 문제가 없다면 그대로 응답 객체 리턴.
  (error) => {
    console.log('response interceptor 동작함! 응답에 문제가 발생!');
    console.log(error);
  },
);

export default axiosInstance;
