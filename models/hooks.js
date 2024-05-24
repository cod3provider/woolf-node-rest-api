export const handleSaveError = (error, data, next) => {
  const {name, code} = error;

  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
    next();
  }
  error.status = 400;
  next();
}

export const setSettingsUpdate = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
