import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getSingleProduct, updateProduct } from "../redux/slices/productSlice";
import { useEffect, useState } from "react";
import { createProductSchema } from "../schema/productSchema";
import { TypeOf } from "zod";
import EditProductForm from "../components/EditProductForm";
import ContactModal from "../modals/ContactModal";

export type ProductInput = TypeOf<typeof createProductSchema>;

type DisplayProductProps = {};

const DisplayProduct: React.FC<DisplayProductProps> = () => {
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const dispatch = useAppDispatch();
  const { product, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.product
  );
  console.log("params", params.id);

  useEffect(() => {
    dispatch(getSingleProduct(params.id));
    console.log("product in useeffect", product);
  }, [params.id]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (isEditing) {
    return (
      <EditProductForm
        product={product}
        handleEdit={handleEdit}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        productId={params.id}
      />
    );
  }
  if (isLoading) {
    <Spinner />;
  }
  return (
    <>
      {console.log("product", product)}
      <Flex m={5}>
        <Text as="b">Hello from DisplayProduct</Text>

        <Flex flexDirection="column">
          <Flex>
            <Image
              src={product.image}
              fallbackSrc="/no_image.png"
              boxSize="100px"
              objectFit="cover"
            />
          </Flex>
          <Flex>
            <Flex alignItems="flex-end" flexDirection="column">
              <Text as="b" fontSize="xl">
                {product.title}
              </Text>
              <Text fontSize="sm">by</Text>
              <Text as="b" fontSize="md">
                {product.author}
              </Text>
            </Flex>
          </Flex>
          <Text>Description: {product.description}</Text>
          <Text>Language: {product.language}</Text>
          <Text>Condition: {product.condition}</Text>
          <Text>Year: {product.year}</Text>
          <Text>Pages: {product.pages}</Text>
          <Text as="b">Price: {product.price} €</Text>
        </Flex>
        <Flex flexDirection="column">
          <Text>Product: {params.id}</Text>
          <Text>User: {product.username}</Text>
        </Flex>
      </Flex>
      <Box>
        <Button onClick={handleEdit}>Edit</Button>
        <ContactModal
          buttonText="Contact Seller"
          productId={params.id}
          seller={product.user}
        />
      </Box>
    </>
  );
};
export default DisplayProduct;
