import { useState,useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
export const DepositForm = () => {
    const [amount, setAmount] = useState("");
    const { authData } = useContext(AuthContext);
    const { userId } = authData;

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { amount: amount };

        fetch(`https://cardapirest-production.up.railway.app/api/deposit/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authData.token}`
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                alert(data.Message)
            })
            .catch((error) => {
                console.error("Error:", error);
                alert(error);
            });
    };

    return (
        <div>

        <NavLink to="/account" className="flex font-bold justify-end mt-2 mr-2">Account</NavLink>
        <div className="flex justify-center">

        <form onSubmit={handleSubmit} className='mt-10 border border-gray-700 rounded-md shadow-2xl '>
            <label className="font-bold text-xl">Amount:</label>
            <br />
            <input
                type="text"
                value={amount}
                className='mt-2 py-2 px-10 border border-gray-500 ml-2 mr-2 '
                onChange={(e) => setAmount(e.target.value)}
            /><br/>
            <input
                type="submit"
                className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md mt-4 mb-4 w-11/12"
                value='Send'
            />
        </form>
        </div>
        </div>
    );
};
