import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer  ")) {
    return res.status(401).json ({message: "Not authorized, no token "});
  }


  try {
    const token = authHeader.split (" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    //DECODED INFO 

    req.user = decoded; 

    next();
  } catch  (error) {
    console.error("JWT verification failed", error);
    res.status(401).json({message: "invalid token or expired token"});


  }
};
