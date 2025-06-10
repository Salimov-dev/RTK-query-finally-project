import { ShoppingCartOutlined } from "@ant-design/icons";
import type { FC } from "react";
import { useAppSelector } from "../hooks/redux.hook";
import { getCart } from "../store/cart";
import { FloatButton } from "antd";

interface IProps {
  showModal: () => void;
}

const FloatButtonStyled: FC<IProps> = ({ showModal }) => {
  const cart = useAppSelector(getCart);

  return (
    <FloatButton
      tooltip="Корзина"
      icon={<ShoppingCartOutlined />}
      badge={{ count: cart?.products.length, color: "red" }}
      onClick={showModal}
      style={{ width: "50px", height: "50px" }}
    />
  );
};

export default FloatButtonStyled;
