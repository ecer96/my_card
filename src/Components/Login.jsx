import React, { useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router";

export const Login = () => {
    const [showAlert, setShowAlert] = useState(false);

    //valida campos vacios
    const validateForm = () => {
        if (formData.email.trim() === "" || formData.password.trim() === "") {
            return false;
        }
        return true;
    };

    //valida el login
    const { login, isAuth } = useContext(AuthContext);
    //redirecciona una vez validado el login
    const navigate = useNavigate();

    //Aqui almacenare los Datos de Email y password Proporcionados en el Form
    const [formData, setFormData] = useState({ email: "", password: "" });

    //Con esto captare los Valores pasados por el usuario.
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (isAuth) navigate("/account");
    }, [isAuth, navigate]);

    //maneja El Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setShowAlert(true);
            return;
        }

        //Hace un Fetch a mi servidor para verificar Los Datos
        const response = await fetch("https://cardapirest-production.up.railway.app/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const { token: { name, abilities },user} = await response.json();
            // hacer algo con el token recibido
            if (name) {
                login(name,abilities.id,user); // se agrega el id a la llamada a login
                Cookies.set("token_cookie",name);
            
            }
        
        } else {
            const errorData = await response.json();
            console.log(errorData);
            alert('Error Login , Please Check you email or password');
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${require("../Assets/bankImage.jpg")})`,
            }}
            className="h-screen bg-cover"
        >
            <div className="w-full justify-center flex">
                <form
                    className="bg-white shadow-md  px-8 pt-6 pb-8 mb-4 w-80 mt-44 rounded-md"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            id="email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                        />
                    </div>
                    <div className="items-center justify-between">
                        <input
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold   py-2 px-4 rounded focus:outline-none focus:shadow-outline min-w-full"
                            type="submit"
                            value="Login"
                        />
                    </div>
                    <p className="capitalize pt-4">
                        Dont have Account?{" "}
                       <a href="/createUser"> <span className="text-blue-500">sign up here</span></a>
                    </p>

                    {showAlert && (
                        <div
                            className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline">
                                {" "}
                                Email and Password are required
                            </span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
