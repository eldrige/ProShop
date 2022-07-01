import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Administrator',
    email: 'admin@example.com',
    // the second param specifies the strength of the hash
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Laurelle Lyvia',
    email: 'laurellelyvia@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@outlook.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Pop Smoke',
    email: 'ronaldnguemo@yahoo.fr',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

// hashing passwords is supposed to be async, but since we r nt
// dealing with forms yet, we use the hashsync method

export default users;
