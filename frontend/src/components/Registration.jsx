
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

export const Registration = () => {
    const api_link = import.meta.env.VITE_API_BASE_URL

    const navigate = useNavigate()
    const [regData, setRegData] = useState({username:"", email:"", password:""})

    const inputHandeler =(e)=>{
        const name = e.target.name 
        const value = e.target.value

        setRegData({
            ...regData,
            [name]: value
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api_link}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(regData),
            });

            if (response.ok) {
                //const res_data = await response.json();
                setRegData({ username: "", email: "", password: "", phone: "" });
                navigate("/signin");
            } else {
                // Handle non-OK responses
                const errorData = await response.json();
                console.error("Error during registration:", errorData);
            }

        } catch (error) {
            console.log("Registration error:", error.message);
        }
    };

   return (
    <div className="flex flex-col items-center justify-center max-w-screen min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <h1 className="text-4xl font-extrabold text-white mb-6 tracking-wide">
            Create Your Account
        </h1>
        <form
            onSubmit={handelSubmit}
            className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl"
        >
            <div className="mb-6">
                <label className="flex justify-start text-gray-300 text-lg mb-2 ">Username:</label>
                <input
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    id="username"
                    value={regData.username}
                    onChange={inputHandeler}
                    required
                />
            </div>
            <div className="mb-6">
                <label className="flex justify-start text-gray-300 text-lg mb-2">Email:</label>
                <input
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    id="email"
                    value={regData.email}
                    onChange={inputHandeler}
                    required
                />
            </div>
            <div className="mb-6">
                <label className=" flex justify-start xt-gray-300 text-lg mb-2">Password:</label>
                <input
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    id="password"
                    value={regData.password}
                    onChange={inputHandeler}
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-cyan-500 text-white font-bold rounded-md hover:bg-cyan-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
                Register
            </button>
        </form>

        <div className="flex space-x-4 mt-6">
           
           <p className="flex justify-between text-center">Already have account?</p>  
            <NavLink to="/signin">
                <button
                    className="px-6 py-3 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-300 focus:ring-2 focus:ring-cyan-400"
                >
                    Login
                </button>
            </NavLink>
        </div>
    </div>
);
};