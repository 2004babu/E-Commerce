export interface Product {
  _id: string;
  Product_Name: string;
  Price: {
    MRP: string;
    Offer: string;
  };
  inStock: string;
  category: string;
  description: string;
  imageUrl: string[];
  totalRate: number;
  Ratings: Array<{
    Rate: number;
  }>;
}

export const products: Product[] = [
  {
    _id: "1",
    Product_Name: "Wireless Headphones",
    Price: {
      MRP: "199",
      Offer: "20"
    },
    inStock: "50",
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
    imageUrl: [
      "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg",
      "https://images.pexels.com/photos/3587477/pexels-photo-3587477.jpeg"
    ],
    totalRate: 4.5,
    Ratings: [
      { Rate: 4 },
      { Rate: 5 }
    ]
  },
  {
    _id: "2", 
    Product_Name: "Smart Watch",
    Price: {
      MRP: "299",
      Offer: "15"
    },
    inStock: "30",
    category: "Wearables",
    description: "Feature-rich smartwatch with health tracking",
    imageUrl: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
      "https://images.pexels.com/photos/437038/pexels-photo-437038.jpeg"
    ],
    totalRate: 4.2,
    Ratings: [
      { Rate: 4 },
      { Rate: 4 }
    ]
  },
  {
    _id: "3",
    Product_Name: "Laptop",
    Price: {
      MRP: "999",
      Offer: "10" 
    },
    inStock: "20",
    category: "Computers",
    description: "Powerful laptop for work and gaming",
    imageUrl: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg",
      "https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg"
    ],
    totalRate: 4.8,
    Ratings: [
      { Rate: 5 },
      { Rate: 4 }
    ]
  }
];

export const categories = [
  {
    _id: "1",
    category: "Electronics",
    imageUrl: ["https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg"]
  },
  {
    _id: "2", 
    category: "Computers",
    imageUrl: ["https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg"]
  },
  {
    _id: "3",
    category: "Wearables",
    imageUrl: ["https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"]
  }
];