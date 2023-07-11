export type conversationType = {
  message: string;
  name: string;
  telephone: string;
  sender: string;
  seller: string;
  productId: string;
  _id: string;
  title: string;
  //   chatId: string;
  //   createdAt: Date;
  //   updatedAt: Date;
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
  sender: string;
  seller: string;
  conversation: conversationType[];
  title: string;
  _id: string;
  //   createdAt: Date;
  //   updatedAt: Date;
};
