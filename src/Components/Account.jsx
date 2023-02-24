import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { RiSendPlane2Line } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AuthContext } from "./AuthProvider";
import { NavLink } from "react-router-dom";
import BouncingBall from "./BouncingBalls";

export const Account = () => {
    const [accountData, setAccountData] = useState(null);
    const { authData } = useContext(AuthContext);
    const { userId } = authData;
    const { name } = authData;
    const { userName } = authData;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = name;
                const response = await fetch(
                    `https://cardapirest-production.up.railway.app/api/getAccount/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    const { Message } = data;
                    setAccountData(Message);
                } else {
                    throw new Error(
                        "We Couldnt Find Details About that Account."
                    );
                }
            } catch (error) {
                console.error(error);
                alert(error)
            }
        };
        fetchData();
    }, [name, userId]);

    if (!accountData) {
        return <div><BouncingBall/></div>;
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center mt-20">
                <div className="bg-black rounded-2xl h-50  w-72 sm:w-96 sm:h-52 ">
                    <p className="text-white font-bold text-lg pt-4">
                        Black Card
                    </p>

                    <div className="flex items-end mt-4 ml-10  ">
                        <img
                            src={require("../Assets/chip.png")}
                            alt="chip"
                            className="h-8 mr-4"
                        ></img>
                        <p className="text-white text-xl sm:text-xl sm:ml-2 sm:mt-4">
                            {accountData.account_number
                                .toString()
                                .match(/.{1,4}/g)
                                .join(" ")}
                        </p>
                    </div>

                    <div className="flex items-center justify-around m-2 mt-5">
                        <div className="flex items-center">
                            <p className="text-white font-light text-sm sm:text-sm">
                                Good
                                <br /> Thru
                            </p>
                            <p className="text-white font-semibold ml-2 text-sm sm:text-md">
                                {accountData.expiration_date}
                            </p>
                        </div>
                        <p className="text-white justify-end font-semibold capitalize text-sm sm:text-md">
                            {userName}
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <img
                            src={require("../Assets/diamond.png")}
                            alt="diamond"
                            className="h-7 invert mr-2"
                        />
                    </div>
                </div>
            </div>

            <table className="flex justify-center mt-20">
                <thead>
                    <tr className="grid">
                        <th>Balance:</th>
                        <th>Total Whithdraw:</th>
                        <th>Total Deposit:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="grid">
                        <td>${accountData.balance}</td>
                        <td>${accountData.withdrawals}</td>
                        <td>${accountData.deposits}</td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-center mt-20">
                <NavLink to={{ pathname: `/deposit/${userId}`, state: { userId } }} className="text-xl items-center m-4">
                    <div className="flex justify-center">
                        <FaRegMoneyBillAlt className="text-2xl" />
                    </div>
                    <p>Deposit</p>
                </NavLink>
                <NavLink to={{pathname:`/send/${userId}`,state:{userId} }} className="text-xl items-center m-4">
                    <div className="flex justify-center">
                        <RiSendPlane2Line className="text-2xl" />
                    </div>
                    <p>Send</p>
                </NavLink>
                <NavLink to={{pathname: `/withdraw/${userId}`,state:{userId}}} className="text-xl items-center m-4">
                    <div className="flex justify-center">
                        <GiReceiveMoney className="text-2xl" />
                    </div>
                    <p>Whithdraw</p>
                </NavLink>
            </div>
        </div>
    );
};
