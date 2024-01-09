import jwt from 'jsonwebtoken';

export const EncodeToken = (phone, user_id) => {
  let token = jwt.sign({ phone: phone, id: user_id }, "ABC123", {
    expiresIn: "1h",
  });
  return token;
};

export const DecodeToken = (token) => {
  try {
    let decoded = jwt.verify(token, "ABC123");
    return decoded;
  } catch (err) {
    return null;
  }
};
