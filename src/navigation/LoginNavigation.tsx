import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";

const LoginNavigation = (props: {setUserToken: any, userToken: string | null}) => {
  return (
  <BrowserRouter>
    <Routes>
      <Route index element={<Login setUserToken={props.setUserToken} userToken={props.userToken}/>} />
      <Route path="create_account" element={<CreateAccount />} />
      <Route path="login"
				element={<Login setUserToken={props.setUserToken} userToken={props.userToken}/>} />
    </Routes>
  </BrowserRouter>   
  );
};

export default LoginNavigation;
