import jwt from 'jsonwebtoken';

const JWT_SECRET = '123abc';

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

// if we head to jwt.io, we realize that we have a 'iat' meaning issuedAt

export default generateToken;
