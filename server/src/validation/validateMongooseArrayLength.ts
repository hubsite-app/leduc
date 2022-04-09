const validateMongooseArrayLength = (
  message: string = "must have at least one",
  min: number = 1
) => {
  return {
    validator: (val: any) => val.length >= min,
    message,
  };
};

export default validateMongooseArrayLength;
