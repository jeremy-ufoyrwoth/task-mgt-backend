import jwt from "jsonwebtoken";

export const createToken = async (payload: any) => {
  const secretKey = process.env.JWT_SECRETE_KEY;

  if (!secretKey)
    return {
      error: true,
      message: "JWT_SECRETE_KEY is not defined in the environment variables.",
    };

  try {
    const token = jwt.sign(payload, secretKey, {
      algorithm: "HS256",
      expiresIn: "24h",
    });

    return { error: false, token };
  } catch (error) {
    console.log({ error });

    return { error: true, message: "Error generating token" };
  }
};

export const verifyToken = async (token: string) => {
  const secretKey = process.env.JWT_SECRETE_KEY;

  if (!secretKey)
    return {
      error: true,
      message: "JWT_SECRETE_KEY is not defined in the environment variables.",
    };

  try {
    const decoded = jwt.verify(token, secretKey);
    return { error: false, decoded };
  } catch (error) {
    console.log({ error });
    return { error: true, message: "Invalid token" };
  }
};
