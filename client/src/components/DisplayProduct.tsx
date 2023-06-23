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
import { getSingleProduct } from "../redux/slices/productSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "../schema/productSchema";
import { TypeOf } from "zod";

type ProductInput = TypeOf<typeof createProductSchema>;

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // } = useForm();
  } = useForm<ProductInput>({
    resolver: zodResolver(createProductSchema),
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = (data) => {
    console.log("data updated");
    setIsEditing(!isEditing);
  };

  if (isEditing) {
    return (
      <>
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>
            Title:
            <Input
              id="title"
              type="text"
              // name="title"
              defaultValue={product.title}
              {...register("title")}
              // ref={register}
            />
            <Text as="p">{errors?.title?.message?.toString()}</Text>
            {console.log("errors", errors)}
          </FormLabel>
          <FormLabel>
            User:
            <Input
              id="user"
              type="text"
              // name="user"
              defaultValue={product.user}
              // ref={register}
            />
            <Text as="p">{errors?.user?.message?.toString()}</Text>
          </FormLabel>
          <FormLabel>
            Author:
            <Input
              id="author"
              type="text"
              // name="author"
              defaultValue={product.author}
              {...register("author")}
              // ref={register}
            />
            <Text as="p">{errors?.author?.message?.toString()}</Text>
          </FormLabel>
          <FormLabel>
            Price:
            <Input
              id="price"
              type="number"
              // name="price"
              defaultValue={product.price}
              {...register("price", { valueAsNumber: true })}
              // ref={register}
            />
            <Text as="p">{errors?.price?.message?.toString()}</Text>
          </FormLabel>
          <Button type="submit">Save</Button>
        </FormControl>

        <Button onClick={handleEdit}>Cancel</Button>
      </>
    );
  }
  return (
    <>
      {console.log("product", product)}
      <Flex flexDirection="column">
        <Text as="b">Hello from DisplayProduct</Text>
        <Text>I'm product: {params.id}</Text>
        <Text>Title: {product.title}</Text>
        <Text>User: {product.user}</Text>
        <Text>Author: {product.author}</Text>
        <Text>Price: {product.price}</Text>
        <button onClick={handleEdit}>Edit</button>
      </Flex>
    </>
  );
};
export default DisplayProduct;
