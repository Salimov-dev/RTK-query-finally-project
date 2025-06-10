import {
  Button,
  Divider,
  Empty,
  Flex,
  FloatButton,
  Modal,
  Typography
} from "antd";
import { useEffect, useState } from "react";
import { clearCart, getCart, loadCart, removeFromCart } from "../store/cart";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";

const { Text, Title } = Typography;

const CartModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);

  const totalAmount =
    cart?.products.reduce((sum, product) => sum + product.total, 0) || 0;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  return (
    <>
      {" "}
      <FloatButton
        tooltip="Корзина"
        icon={<ShoppingCartOutlined />}
        badge={{ count: cart?.products.length, color: "red" }}
        onClick={showModal}
        style={{ width: "50px", height: "50px" }}
      />
      <Modal
        title={<Title level={4}>Корзина</Title>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Закрыть
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={!cart || cart.products.length === 0}
          >
            Оформить заказ
          </Button>
        ]}
        width={600}
      >
        {cart && cart.products.length > 0 ? (
          <Flex vertical gap={16}>
            {/* Список товаров */}
            <Flex vertical gap={8}>
              {cart.products.map((product) => (
                <Flex
                  key={product.id}
                  justify="space-between"
                  align="center"
                  style={{
                    padding: "12px",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                    background: "#fafafa"
                  }}
                >
                  <Flex vertical style={{ flex: 1 }}>
                    <Text strong>{product.title}</Text>
                    <Text type="secondary">
                      Цена: ${product.price} × {product.quantity} = $
                      {product.total}
                    </Text>
                  </Flex>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => dispatch(removeFromCart(product.id))}
                  />
                </Flex>
              ))}
            </Flex>

            {/* Итоговая сумма */}
            <Divider />
            <Flex justify="space-between" align="center">
              <Text strong>Итого:</Text>
              <Text strong style={{ fontSize: "18px", color: "#1890ff" }}>
                ${totalAmount.toFixed(2)}
              </Text>
            </Flex>

            {/* Кнопка очистки корзины */}
            <Button
              type="link"
              danger
              onClick={() => dispatch(clearCart())}
              style={{ padding: 0, marginTop: "8px" }}
            >
              Очистить корзину
            </Button>
          </Flex>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Ваша корзина пуста"
            style={{ margin: "24px 0" }}
          />
        )}
      </Modal>
    </>
  );
};

export default CartModal;
