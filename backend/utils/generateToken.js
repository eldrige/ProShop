import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// if we head to jwt.io, we realize that we have a 'iat' meaning issuedAt

export default generateToken;
