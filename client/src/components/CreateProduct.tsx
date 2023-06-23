import {
  Box,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createProductSchema } from "../schema/productSchema";
import { TypeOf } from "zod";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createProduct, getAllProducts } from "../redux/slices/productSlice";

type ProductInput = TypeOf<typeof createProductSchema>;

const CreateProduct: React.FC = () => {
  const [productError, setProductError] = useState(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { product, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.product
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductInput>({
    resolver: zodResolver(createProductSchema),
  });

  type temporaryCreateProductType = {
    title: string;
    author: string;
    price: number;
    language: string;
  };
  const handleProduct = async (values: temporaryCreateProductType) => {
    try {
      // const response = await axios.post(
      //   `${import.meta.env.VITE_SERVER_ENDPOINT}/api/products`,
      //   values,
      //   { withCredentials: true }
      // );

      dispatch(createProduct(values));
      // console.log("response.data", response.data);
      // return response.data;
    } catch (error: any) {
      setProductError(error.message);
      console.log("handleClick() error", error);
    }
  };

  console.log("product", product);
  return (
    <>
      <Text>Hi from product</Text>

      <Box>
        <Flex maxWidth="400px" direction="column" alignItems="center">
          <Text as="p">{productError}</Text>

          <FormControl
            as="form"
            isRequired
            onSubmit={handleSubmit(handleProduct)}
          >
            <FormLabel>Title</FormLabel>
            <Input
              id="title"
              type="text"
              placeholder="book title"
              {...register("title")}
            />
            <Text as="p">{errors?.title?.message?.toString()}</Text>
            <FormLabel>Author</FormLabel>
            <Input
              id="author"
              type="text"
              placeholder="book author"
              {...register("author")}
            />
            <Text as="p">{errors?.author?.message?.toString()}</Text>
            <FormLabel>Price</FormLabel>
            <Input
              id="price"
              type="number"
              placeholder="book price"
              {...register("price", { valueAsNumber: true })}
            />
            <Text as="p">{errors?.price?.message}</Text>
            <FormLabel>Language</FormLabel>
            <Input
              id="language"
              type="text"
              placeholder="book language"
              {...register("language")}
            />
            <Text as="p">{errors?.language?.message?.toString()}</Text>
            <Button type="submit">Add product</Button>
          </FormControl>
        </Flex>
      </Box>
    </>
  );
};
export default CreateProduct;
