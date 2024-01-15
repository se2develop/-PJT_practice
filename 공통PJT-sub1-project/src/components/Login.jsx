import { Fragment, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../store/authSlice";

export default function Login() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const user = {
    id: 'ssafy',
    password: 'ssafy'
  }

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  function changeIdHandler(event) {
    setId(event.target.value);
  }

  function changePwHandler(event) {
    setPassword(event.target.value);
  }
  
  function loginHandler(event) {
    if(id !== user.id) {
      alert("존재하지 않는 아이디입니다.");
      return;
    }

    if(password !== user.password) {
      alert("잘못된 비밀번호를 입력하셨습니다.");
      return;
    }
      dispatch(authActions.LOGIN());
  }

  function logoutHandler() {
    setId('');
    setPassword('');
    dispatch(authActions.LOGOUT());
  }
  // 삼항연산자 사용, 로그인 안되어있으면 폼 보여주고, 아니면 로그아웃 버튼
  return (
    <Fragment>
      {
        !isLogin ? (
          <form>
            <div>
              <label htmlFor='id'>아이디 : </label>
              <input name='id' value={id} placeholder="ssafy" onChange={changeIdHandler} />
              <br/ >
              <label htmlFor='password'>비밀번호 : </label>
              <input name='password' value={password} placeholder="ssafy" onChange={changePwHandler} />
              <br/ >
              <button onClick={loginHandler}>로그인</button>
            </div>
          </form>
        ) : (
          <button onClick={logoutHandler}>로그아웃</button>
        )
      }
    </Fragment>
  );
}
