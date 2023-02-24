import { useState } from "react";

export const CreateUserForm = () => {
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("https://cardapirest-production.up.railway.app/api/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                name,
                birthday,
                phone,
                email,
                password,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    console.log("User created successfully");
                    alert("User created successfully");
                } else {
                    console.error(data.errors);
                    alert(
                        "Error creating user: " + JSON.stringify(data.errors)
                    );
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Error creating user: " + error.message);
            });
    };

    return (
        <div>
        <div className="flex">

            <a href="/" className=" bg-gray-400 px-8 py-2 rounded-sm shadow-2xl">
                Login
            </a>
        </div>

            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="items-center border-slate-700 border px-16 py-8 rounded-md mt-20 shadow-2xl"
                >
                    <legend className="font-bold text-2xl mb-6">
                        Create User
                    </legend>
                    <label className="text-xl flex" htmlFor="name">
                        Name:
                    </label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className=" px-4 py-1 "
                        id="name"
                    />
                    <br />
                    <br />
                    <label className="text-xl flex" htmlFor="birthday">
                        Birthday:
                    </label>
                    <br />
                    <input
                        type="date"
                        value={birthday}
                        onChange={(event) => setBirthday(event.target.value)}
                        className=" px-4 py-1 "
                        id="birthday"
                    />
                    <br />
                    <br />
                    <label className="text-xl flex" htmlFor="phone">
                        Phone:
                    </label>
                    <br />
                    <input
                        type="text"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className=" px-4 py-1 "
                        id="phone"
                    />
                    <br />
                    <br />
                    <label className="text-xl flex" htmlFor="email">
                        Email:
                    </label>
                    <br />
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className=" px-4 py-1 "
                        id="email"
                    />
                    <br />
                    <br />
                    <label className="text-xl flex " htmlFor="password">
                        Password:
                    </label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className=" px-4 py-1 "
                        id="password"
                    />
                    <br />
                    <br />
                    <input
                        type="submit"
                        className="bg-green-500 px-10 py-2 text-xl text-white hover:bg-green-700 mt-4"
                    />
                </form>
            </div>
        </div>
    );
};
