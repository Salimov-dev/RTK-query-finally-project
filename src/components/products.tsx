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
import { useAppDispatch } from "../hooks/redux.hook";
import { addToCart } from "../store/cart";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useUpdateProductMutation
} from "../store/products.api";
import type { IProductUpdate, ProductInput } from "../types/product.types";

const { Meta } = Card;
const { Content } = Layout;

const Products = () => {
  const dispatch = useAppDispatch();

  // const [trigger, { data: products, isLoading }] = useLazyGetProductsQuery();
  const { data: products, isLoading, refetch } = useGetProductsQuery();

  const [addProduct, { isLoading: isCreating }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleAddProduct = async (newProduct: ProductInput) => {
    try {
      await addProduct(newProduct).unwrap();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleUpdateProduct = async (product: IProductUpdate) => {
    try {
      await updateProduct(product).unwrap();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      console.log("err", err);
    }
  };

  // const handleLoadProducts = () => {
  //   trigger();
  // };

  const handleRefresh = () => {
    refetch();
  };

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG
      }}
    >
      {/* <Flex justify="center" style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleLoadProducts}
          disabled={isLoading}
          loading={isLoading}
        >
          Загрузить продукты
        </Button>
      </Flex> */}

      <Flex justify="center" style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleRefresh}
          disabled={isLoading}
          loading={isLoading}
        >
          Обновить продукты
        </Button>
      </Flex>

      {isLoading ? (
        <Flex
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spin size="large" />
        </Flex>
      ) : (
        <Row gutter={[16, 16]}>
          {products?.map((product) => {
            return (
              <Col span={6} key={product.id}>
                <Card
                  hoverable
                  style={{
                    width: "100%",
                    height: "485px"
                  }}
                  cover={
                    <img
                      alt={product.title}
                      src={product.thumbnail}
                      style={{ height: "260px" }}
                    />
                  }
                >
                  <Meta
                    title={product.title}
                    description={
                      <Flex
                        vertical
                        gap={6}
                        justify="space-between"
                        style={{ minHeight: "120px" }}
                      >
                        <Typography.Paragraph
                          style={{
                            marginBottom: "16px",
                            flex: 1
                          }}
                          ellipsis={{ rows: 3 }}
                        >
                          {product.description}
                        </Typography.Paragraph>
                        <Typography.Text style={{ fontWeight: "bold" }}>
                          {product.price}$
                        </Typography.Text>

                        <Button onClick={() => dispatch(addToCart(product))}>
                          Добавить в корзину
                        </Button>
                      </Flex>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Content>
  );
};

export default Products;
