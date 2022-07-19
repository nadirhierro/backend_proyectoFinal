let db = {
  mongo_atlas: process.env.MONGO_ATLAS,
  crypto: process.env.MONGO_ENCRYPT,
  advancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
};

export { db };
