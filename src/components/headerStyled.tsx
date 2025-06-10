import { MenuFoldOutlined } from "@ant-design/icons";
import {
  Button,
  Layout,
  theme,
  Card,
  Col,
  Row,
  Typography,
  Flex,
  Spin
} from "antd";

const { Header } = Layout;

const HeaderStyled = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={<MenuFoldOutlined />}
        onClick={() => {}}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64
        }}
      />
    </Header>
  );
};

export default HeaderStyled;
