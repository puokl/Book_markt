import { Button, Flex, Spinner, Text, Image, Box } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productType } from "../types/productType";
import { TfiLocationPin } from "react-icons/tfi";
import { dateFromNow } from "../utils/textFormat";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [displayedProductsCount, setDisplayedProductsCount] = useState(10);

  const handleLoadMore = () => {
    setDisplayedProductsCount((prevCount) => prevCount + 10);
  };

  const { products, isLoading } = useAppSelector((state: any) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
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
                  <Flex alignItems="center">
                    <TfiLocationPin />
                    <Text ml={2} fontSize="sm">
                      {item.location}
                    </Text>
                  </Flex>
                  <Text>{dateFromNow(item.createdAt)}</Text>
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
              </Flex>
            </Flex>
          ))}
      <Flex>
        {products && products.length > displayedProductsCount && (
          <Button onClick={handleLoadMore}>Load More</Button>
        )}
      </Flex>
    </>
  );
};
export default ProductList;
