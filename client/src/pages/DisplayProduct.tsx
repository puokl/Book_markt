import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
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
  }, []);

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
      <Flex flexDirection="column">
        <Text as="b">Hello from DisplayProduct</Text>
        <Text>I'm product: {params.id}</Text>
        <Text>User: {product.user}</Text>
        <Text>Title: {product.title}</Text>
        <Text>Author: {product.author}</Text>
        <Text>Price: {product.price}</Text>
        <Text>Language: {product.language}</Text>
        <Text>Description: {product.description}</Text>
        <Text>Year: {product.year}</Text>
        <Text>Condition: {product.condition}</Text>
        <Text>Pages: {product.pages}</Text>
        <Button onClick={handleEdit}>Edit</Button>
        <ContactModal
          buttonText="Contact Seller"
          productId={params.id}
          seller={product.user}
        />
      </Flex>
    </>
  );
};
export default DisplayProduct;
