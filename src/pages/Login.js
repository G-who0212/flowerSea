import React, {useState} from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {

    const navigate = useNavigate();

    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

    const onIdHandler = (event) => {
        setId(event.target.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value)
    }

    const domain = "http://192.168.35.160:8080/";

	const userData = {
		username: Id,
		password: Password
	}

    const onSubmit = async () => {
		try {
			if (Id === "" || Password === "") {
				alert("아이디와 비밀번호를 입력해주세요.");
				return;
			}
			const res = await axios.post(domain + "api/userinfo/login/", userData);
			localStorage.setItem("userToken", res.data.token);
			localStorage.setItem("userName", res.data.name);
			return navigate("/");
		} catch (err) {
			// console.log(err);
			if (err.response.status === 400) {
				alert("아이디와 비밀번호를 확인해주세요.");
			} else {
				alert("서버 에러입니다.");
			}
		}
	}

return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'
        }}
    >
        <form 
            className="p-10 bg-white rounded-xl space-y-5" 
            action=""
            style={{ display: 'flex', flexDirection: 'column'}}
            //onSubmit={onSubmitHandler}
        >
            <h1 className="login">로그인</h1>
            <img className="loginlogo" alt="symbol_temporary" src="/images/symbol.png" />
            <div className="loginbd">
            </div>
            <div className="ID">
                <label className="" htmlFor='id'>아이디</label>
                <input 
                    className="IDbox" 
                    type='text' 
                    name='id' 
                    value={Id} 
                    onChange={onIdHandler} 
                    placeholder="아이디를 입력해주세요!"
                />
            </div>
            <div className="PW">
                <label className="" htmlFor='pw'>비밀번호</label>
                <input 
                    className="PWbox" 
                    type='password' 
                    name='pw'   
                    value={Password} 
                    onChange={onPasswordHandler}
                    placeholder ="비밀번호를 입력해주세요!" 
                />
            </div>
            <div className="lgbt">
                <button 
                    className="button"
                    type='submit'
                    onClick={onSubmit}
                >로그인하기</button>
            </div>
            <Link to="/register">
            <button className="GoRegister"><u>회원가입하기</u></button>
            </Link>
        </form>
    </div>

    )
}