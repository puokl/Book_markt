import { Button, Flex, Spinner, Text, Image, Box } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts, deleteProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productType } from "../types/productType";
import { useParams } from "react-router-dom";
import moment from "moment";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  //SECTION -
  const [displayedProductsCount, setDisplayedProductsCount] = useState(10);

  const handleLoadMore = () => {
    setDisplayedProductsCount((prevCount) => prevCount + 10);
  };

  //SECTION -

  const dispatch = useAppDispatch();

  const { products, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.product
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Text>Hi from product list</Text>

      {console.log("product in jsx", products)}
      {console.log("product in productlist", products)}

      {products &&
        products
          .slice(0, displayedProductsCount)
          .map((item: productType, index: number) => (
            <Flex
              key={index}
              bg="yellow.100"
              border="1px solid red"
              // direction="column"
              p={6}
              as="button"
              onClick={() => navigate(`/product/${item.productId}`)}
              w="70%"
              m={2}
            >
              <Flex w="20%">
                <Box>
                  <Image
                    src={item.image}
                    fallbackSrc="/no_image.png"
                    boxSize="100px"
                    objectFit="cover"
                  />
                </Box>
              </Flex>
              <Flex direction="column" w="80%" alignItems="flex-start">
                <Flex justifyContent="space-between" w="100%">
                  <Text>Berlin</Text>
                  <Text> {moment(item.createdAt).fromNow()}</Text>
                </Flex>
                <Flex alignItems="center" w="100%">
                  <Text as="b" fontSize="lg">
                    {item.title}
                  </Text>
                  <Text fontSize="xs">&nbsp;by&nbsp;</Text>
                  <Text as="b" fontSize="md">
                    {item.author}
                  </Text>
                </Flex>
                <Box>
                  <Text fontSize="sm">
                    {item.description.length > 150
                      ? item.description.slice(0, 150) + "..."
                      : item.description}
                  </Text>
                </Box>
                <Flex justifyContent="space-between" w="100%">
                  <Text as="b">{item.price} €</Text>
                  <Text>Language: {item.language}</Text>
                </Flex>
                {/* <Text>ProductId: {item.productId}</Text> */}
                {/* <Text>User: {item.user}</Text> */}
                {/* <Text>Condition: {item.condition}</Text> */}
                {/* <Text>Year: {item.year}</Text>
              <Text>Pages: {item.pages}</Text> */}
              </Flex>
            </Flex>
          ))}
      {products && products.length > displayedProductsCount && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
    </>
  );
};
export default ProductList;
