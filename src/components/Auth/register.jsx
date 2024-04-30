import { Link } from "react-router-dom";
import {useState} from "react"
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [formData,setFormData]=useState({firstName:'', lastName:'', email:'', password:''})
  const navigate = useNavigate()
  function handelSubmit(event){
    event.preventDefault()

    fetch('http://localhost:3500/register',{
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(res=>res.json())
    .then(info=>{
      console.log(info)
      if(info.acknowledged===true){

        setFormData({firstName:'', lastName:'', email:'', password:''})
        navigate('/login')
      }
    })

  }
  function handelOnChangeInput(event){
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  return (
    <div className="bg-slate-900 p-5">
      <div className="w-full md:w-1/2 mx-auto bg-[#030317] text-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handelSubmit}>
          <div className="mb-6">
            <label htmlFor="firstName" className="block mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              required
              onChange={handelOnChangeInput}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="lastName" className="block mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              required
              onChange={handelOnChangeInput}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              required
              onChange={handelOnChangeInput}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              required
              onChange={handelOnChangeInput}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Create Account
            </button>
          </div>
          <p className="text-center">
            Already have account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
