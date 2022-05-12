module.exports = mongoose => {
    const Tutorial = mongoose.model(
      "product",
      mongoose.Schema(
        {
          name: String,
          sku: String,
          category: String,
          price: Decimal128,
        },
        { timestamps: true }
      )
    );
    return Product;
  };