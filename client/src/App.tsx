import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";
import UserProfile from "./components/UserProfile";
import Missing from "./components/Missing";
import Home from "./components/Home";
import Test from "./components/Test";
import Testo from "./components/Testo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="test" element={<Test />} />
        <Route path="testo" element={<Testo />} />

        {/* protected routes */}
        <Route path="/" element={<Home />} />
        <Route path="user" element={<UserProfile />} />

        {/* catch all */}
        <Route path="*" element={<Missing />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
