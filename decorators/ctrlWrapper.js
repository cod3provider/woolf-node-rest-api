const ctrlWrapper = ctrl => {
  const funcDecorator = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    }
    catch (err) {
      next(err);
    }
  }
  return funcDecorator;
}

export default ctrlWrapper;
