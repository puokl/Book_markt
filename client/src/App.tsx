import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Missing from "./pages/Missing";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Testo from "./pages/Testo";
import CreateProduct from "./pages/CreateProduct";
import User from "./components/User";
import DisplayProduct from "./pages/DisplayProduct";
import Messages from "./pages/Messages";

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
        <Route path="messages/received/:userId" element={<Messages />} />

        {/* protected routes */}
        <Route path="user" element={<User />} />

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
