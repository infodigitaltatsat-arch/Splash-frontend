import banner1 from "../assets/products/BG1.png";
import banner2 from "../assets/products/BG2.png";
import banner3 from "../assets/products/BG3.png";
import milkImage from "../assets/products/Milk.jpg";
import curdImage from "../assets/products/curd.jpg";
import paneerImage from "../assets/products/chees.avif";
import gheeImage from "../assets/products/ghee.jpg";
import butterImage from "../assets/products/butter.jpg";
import buttermilkImage from "../assets/products/butterMilk.jpg";
import flavouredMilkImage from "../assets/products/flavourMilk.webp";

export const banners = [
  {
    id: 1,
    image: banner1,
  },
  {
    id: 2,
    image: banner2,
  },
  {
    id: 3,
    image: banner3,
  },
];

export const categories = [
  {
    id: "milk",
    name: "Milk",
    image: milkImage,
  },
  {
    id: "curd",
    name: "Curd",
    image: curdImage,
  },
  {
    id: "paneer",
    name: "Paneer",
    image: paneerImage,
  },
  {
    id: "ghee",
    name: "Ghee",
    image: gheeImage,
  },
  {
    id: "butter",
    name: "Butter",
    image: butterImage,
  },
  {
    id: "buttermilk",
    name: "Buttermilk",
    image: buttermilkImage,
  },
  {
    id: "flavoured-milk",
    name: "Flavoured Milk",
    image: flavouredMilkImage,
  },
  {
    id: "more",
    name: "More",
    image: "/images/categories/more.png",
  },
];

export const bestSellers = [
  {
    id: "milk-001",
    name: "Cow Milk",
    quantity: "1 Ltr",
    price: 60,
    image: milkImage,
  },
  {
    id: "paneer-001",
    name: "Fresh Paneer",
    quantity: "200 gm",
    price: 120,
    image: paneerImage,
  },
  {
    id: "ghee-001",
    name: "A2 Cow Ghee",
    quantity: "500 ml",
    price: 450,
    image: gheeImage,
  },
];