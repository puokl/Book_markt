import supertest from "supertest";

describe("product", () => {
  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", () => {
        // expect(true).toBe(true);
        const productId = "product-123";
        await supertest().get(`/api/products/${productId}`).expect(404);
      });
    });
  });
});
