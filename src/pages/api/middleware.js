const middleware = (req, res, next) => {
  let Token = req.headers["token"];
  jwt.verify(Token, "ABC123", function (err, decoded) {
    if (err) {
      res.status(401).json({ status: "Unauthorized" });
    } else {
      req.headers.id = decoded["id"];
      next();
    }
  });
  next();
};

export default middleware;
