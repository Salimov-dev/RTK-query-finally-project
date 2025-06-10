import { Layout } from "antd";
import "./reset.css";
import CartModal from "./components/cartModal";
import HeaderStyled from "./components/headerStyled";
import Products from "./components/products";

function App() {
  return (
    <Layout style={{ width: "100%", minHeight: "100vh", height: "100%" }}>
      <HeaderStyled />
      <Products />

      <CartModal />
    </Layout>
  );
}

export default App;
