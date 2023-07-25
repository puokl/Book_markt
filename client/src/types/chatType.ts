export type conversationType = {
  message: string;
  senderId: string;
  sellerId: string;
  senderName: string;
  sellerName: string;
  productId: string;
  _id: string;
  title: string;
  //   chatId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type addConversationType = {
  message: string;
};

export type chatInputType = {
  message: string;
  name: string;
  telephone: string;
};
export type chatType = {
  productId: string;
  productImage: string;
  senderId: string;
  sellerId: string;
  senderName: string;
  sellerName: string;
  conversation: conversationType[];
  title: string;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type conversationInputType = {
  conversation: {
    senderId: any;
    sellerId: string;
    senderName: any;
    sellerName: string;
    productId: string;
    productImage: string;
    message: string;
  };
  chatId: string;
};

export type conversationFormProps = {
  sellerId: string;
  sellerName: string;
  chatId: string;
  productId: string;
  productImage: string;
};
