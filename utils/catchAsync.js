/**
 * The catchAsync function that takes a request, response and next
 * it returns itself and if there is an error catches it in the next fn.
 */
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
