export const handleMongooseErr = (error, data, next) => {
  error.status = 400;
  next();
}
