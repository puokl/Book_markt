import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import { ProductInput } from "../pages/DisplayProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { createProductSchema } from "../schema/productSchema";
import { useAppDispatch } from "../redux/hooks";
import { updateProduct } from "../redux/slices/productSlice";
import { useForm } from "react-hook-form";

type temporaryCreateProductType = {
  title: string;
  author: string;
  price: number;
  language: string;
  description: string;
  year: number;
  condition: string;
  pages: number;
};
type EditProductFormProps = {
  product: any;
  handleEdit: () => void;
  setIsEditing: (value: boolean) => void;
  isEditing: boolean;
  productId: string | undefined;
};

type ProductInput = TypeOf<typeof createProductSchema>;
const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  setIsEditing,
  isEditing,
  handleEdit,
  productId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // } = useForm();
  } = useForm<ProductInput>({
    resolver: zodResolver(createProductSchema),
  });
  const dispatch = useAppDispatch();

  const handleUpdate = async (values: temporaryCreateProductType) => {
    try {
      //   console.log("params.id in handleupdate", params.id);
      console.log("params.id in handleupdate", productId);
      const numero = productId;
      const parametri = { numero, values };
      console.log("parametri", parametri);
      dispatch(updateProduct({ parametri }));
      console.log("data updated");
      setIsEditing(!isEditing);
    } catch (error) {
      console.log("error on handleupdate", error);
    }
  };
  return (
    <>
      <Text>Hi from DisplayProduct</Text>
      <FormControl as="form" onSubmit={handleSubmit(handleUpdate)}>
        <FormLabel>
          Title:
          <Input
            id="title"
            type="text"
            defaultValue={product.title}
            {...register("title")}
          />
          <Text as="p">{errors?.title?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          User:
          <Input id="user" type="text" defaultValue={product.user} />
          <Text as="p">{errors?.user?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          Author:
          <Input
            id="author"
            type="text"
            defaultValue={product.author}
            {...register("author")}
          />
          <Text as="p">{errors?.author?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          Price:
          <Input
            id="price"
            type="number"
            defaultValue={product.price}
            {...register("price", { valueAsNumber: true })}
          />
          <Text as="p">{errors?.price?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          Language:
          <Input
            id="language"
            type="text"
            defaultValue={product.language}
            {...register("language")}
          />
          <Text as="p">{errors?.language?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          Description:
          <Input
            id="description"
            type="text"
            defaultValue={product.description}
            {...register("description")}
          />
          <Text as="p">{errors?.description?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          Pages:
          <Input
            id="pages"
            type="number"
            defaultValue={product.pages}
            {...register("pages", { valueAsNumber: true })}
          />
          <Text as="p">{errors?.pages?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          Year:
          <Input
            id="year"
            type="number"
            defaultValue={product.year}
            {...register("year", { valueAsNumber: true })}
          />
          <Text as="p">{errors?.year?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          Condition:
          <Input
            id="condition"
            type="text"
            defaultValue={product.condition}
            {...register("condition")}
          />
          <Text as="p">{errors?.condition?.message?.toString()}</Text>
        </FormLabel>
        <Button type="submit">Save</Button>
      </FormControl>

      <Button onClick={handleEdit}>Cancel</Button>
    </>
  );
};
export default EditProductForm;
