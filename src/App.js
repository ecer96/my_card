import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Account } from "./Components/Account";
import { AuthProvider } from "./Components/AuthProvider";
import { CreateUserForm } from "./Components/CreateUserForm";
import { DepositForm } from "./Components/DepositForm";
import { Login } from "./Components/Login";
import { SendForm } from "./Components/SendForm";
import { WithdrawForm } from "./Components/WithdrawForm";


function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/createUser" element={<CreateUserForm/>}/>
                    <Route path="/deposit/:id" element={<DepositForm/>}/>
                    <Route path="/withdraw/:id" element={<WithdrawForm/>}/>
                    <Route path="/send/:id" element={<SendForm/>}/>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
