const errorHandler = (err, req, res, next) => {
  console.log(err);
  next();
};

module.exports = errorHandler;
