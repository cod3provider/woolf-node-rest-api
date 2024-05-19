export const handleMongooseErr = (error, data, next) => {
  error.status = 400;
  next();
}

export const setSettingsUpdate = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
