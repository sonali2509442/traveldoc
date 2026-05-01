import React from 'react'
import { Link } from 'react-router-dom'
import loginImg from "../assets/loginimg.jpg";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";


const Login = () => {

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User info:", user);
    // You can store user in context/state or redirect to dashboard
  } catch (error) {
    console.error(error);
  }

}
  return (
    <div>
       <div>
        {/* <div className="h-[110vh]  w-[200vh] bg-cover  flex items-center justify-center text-white "
                style={{
                  backgroundImage:
                    `url(${loginImg})`,
                }}
              ></div> */}
       </div>
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
  <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold text-center mb-6">Welcome to TraveldocU</h2>
    <form className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input 
        type="email" 
        placeholder="Email" 
        autoComplete="off"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
      />
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <input 
        type="password" 
        placeholder="Password" 
        autoComplete="new-password"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
      />
      <button 
        type="submit" 
        className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
      >
        Log In
      </button>
    </form>
    
    <div className="flex items-center my-4">
      <hr className="flex-grow border-t border-gray-300" />
      <span className="mx-2 text-gray-400">or</span>
      <hr className="flex-grow border-t border-gray-300" />
    </div>

    
    <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition">
      <img src="/google logo.png" alt="Google" class="w-5 h-5 mr-3"/>
      Continue with Google
    </button>
    <p className="text-sm text-gray-500 text-center mt-4">
      Don't have an account? 
      <Link to="/signup" href="#" className="text-red-500 font-medium hover:underline">Sign up</Link>
    </p>
  </div>
</div>

    </div>
  )
}

export default Login