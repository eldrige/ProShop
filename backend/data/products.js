const today = new Date();

const generateRandomExpiryDate = () => {
  let randomInt = +(Math.random() * 100).toFixed(0);
  let randomDate = today.setDate(today.getDate() + randomInt);
  return randomDate;
};

const products = [
  {
    name: 'Panadol',
    image: '/images/panadol.jpg',
    description: 'A pain killer suited for all your needs',
    brand: 'Pain Killer',
    category: 'Electronics',
    price: 1500,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    expiryDate: generateRandomExpiryDate(),
  },
  {
    name: 'Anti Inflamotory',
    image: '/images/anti-inflamatory.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Anti Inflamtory',
    category: 'Neutraliser',
    price: 2000,
    countInStock: 10,
    rating: 4.0,
    numReviews: 8,
    expiryDate: generateRandomExpiryDate(),
  },
  {
    name: 'Bio-Zyme',
    image: '/images/bio-zyme.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laudantium consectetur animi pariatur eum cumque rerum voluptas eaque enim! Laborum quia facilis deserunt tenetur pariatur accusantium commodi, incidunt earum quisquam.',
    brand: 'Enzymes',
    category: 'Enzymes',
    price: 5000,
    countInStock: 10,
    rating: 3,
    numReviews: 12,
    expiryDate: generateRandomExpiryDate(),
  },
  {
    name: 'Glucagol',
    image: '/images/glucagol.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Glucagol',
    category: 'Antiinflamotory',
    price: 10000,
    countInStock: 10,
    rating: 5,
    numReviews: 12,
    expiryDate: generateRandomExpiryDate(),
  },
  {
    name: 'Raw calcium',
    image: '/images/raw-calcium.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics',
    price: 5000,
    countInStock: 10,
    rating: 3.5,
    numReviews: 10,
    expiryDate: generateRandomExpiryDate(),
  },
  {
    name: 'Thomapyrin',
    image: '/images/thomapyrin.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: 1000,
    countInStock: 10,
    rating: 4,
    numReviews: 12,
    expiryDate: generateRandomExpiryDate(),
  },
];

export default products;
