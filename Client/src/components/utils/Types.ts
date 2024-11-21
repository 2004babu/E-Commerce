
//productType
export interface productType {
    _id: string,
    Price: {
      MRP: string,
      Offer: string
    },
    inStock: string,
    category: string,
    description: string,
    imageUrl:string [],
    Product_Name: string,
    P_Status: string,
    Comments: [{ userId: string, _id: string, comment: string, userName: string, likes: [{ userId: string }] }],
    Ratings: [{ userId: string, _id: string, Rate: number }],
    likedBy: [{ userId: string, _id: string }],
    totalRate: number,
  
  }

  
  