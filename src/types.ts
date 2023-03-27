export type ProductDataType = {
    id: string
    name: string
    categories: string
    price: number
    images: string[],
    slug:string,
    description:string
  }
  
  export type productDataTypeKey = keyof ProductDataType