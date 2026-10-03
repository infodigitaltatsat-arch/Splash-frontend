import { productData } from "./productData";

const products = Object.values(productData).flat();

export const orderData = [
  {
    id: "ZG102345",
    date: "28 Sep 2026, 10:30 AM",
    status: "Processing",
    total: 240,
    items: [
      products.find((item) => item.id === "milk-001"),
      {
        id: "paneer-001",
        name: "Fresh Paneer",
        image: "/images/products/paneer.png",
      },
      {
        id: "curd-001",
        name: "Curd / Dahi",
        image: "/images/products/curd.png",
      },
    ],
    itemCount: 3,
  },

  {
    id: "ZG102301",
    date: "26 Sep 2026, 05:15 PM",
    status: "Delivered",
    total: 310,
    items: [
      products.find((item) => item.id === "milk-001"),
      {
        id: "paneer-001",
        name: "Fresh Paneer",
        image: "/images/products/paneer.png",
      },
      {
        id: "paneer-002",
        name: "Paneer",
        image: "/images/products/paneer.png",
      },
    ],
    itemCount: 4,
  },

  {
    id: "ZG102290",
    date: "21 Sep 2026, 11:20 AM",
    status: "Cancelled",
    total: 150,
    items: [
      products.find((item) => item.id === "milk-001"),
      {
        id: "curd-001",
        name: "Curd / Dahi",
        image: "/images/products/curd.png",
      },
    ],
    itemCount: 2,
  },
];