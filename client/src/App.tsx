import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";
import Missing from "./components/Missing";
import Home from "./components/Home";
import Test from "./components/Test";
import Testo from "./components/Testo";
import CreateProduct from "./components/CreateProduct";
import User from "./components/User";
import DisplayProduct from "./components/DisplayProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="test" element={<Test />} />
        <Route path="testo" element={<Testo />} />
        <Route path="addproduct" element={<CreateProduct />} />
        <Route path="product/:id" element={<DisplayProduct />} />

        {/* protected routes */}

        <Route path="user" element={<User />} />

        {/* catch all */}
        <Route path="*" element={<Missing />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
