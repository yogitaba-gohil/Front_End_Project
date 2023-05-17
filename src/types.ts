export type ProductDataType = {
    id: string
    name: string
    categories: string
    price: number
    images: string[],
    slug:string,
    description:string,
    sizes: string,
    isAvailable: boolean,
    variants:string
  
  }
  export type SingleProductDataType = {
    id: string
    name: string
    categoryId: string
    price: number
    images: [],
    slug:string,
    description:string,
    sizes: string,
    isAvailable: boolean,
    variants:string

  }
  
  export type productDataTypeKey = keyof ProductDataType