import React , { useState }from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dangky() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
      const response = await axios.post("http://localhost:3000/auth/register", { username ,  password , email});
      if (response.data.success === true) {
          navigate("/login")
      } else {
        console.log('Đăng ký không thành công!'); // Thực hiện hành động nếu đăng nhập không thành công
      }
  
      
  };

  return (
    <main className="container mx-auto p-4 mt-12 bg-white flex flex-col items-center justify-center text-gray-700">
    <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
        <h1 className="text-4xl font-semibold">Welcome back.</h1>
    </div>
    <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
        <input value={username} onChange={(e) => setUsername(e.target.value)} className="mb-4 p-2 appe rance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500" type="text" placeholder="username"/>
        <input  value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500" type="text" placeholder="Password"/>
        <input  value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500" type="text" placeholder="email"/>
        <div className="flex items-center">
            <div className="w-1/2 flex items-center">
                <input id="remember-me" type="checkbox" className="mt-1 mr-2" />
                <label >Remember me!</label>
            </div>
            <button className="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900" onClick={handleLogin}  type="submit">Đăng Ký</button>
        </div>
    </div>
</main>
  );
}

export default Dangky