export type productDataType = {
    id: string
    name: string
    categories: string
    price: number
    image: string,
    slug:string,
    description:string
  }
  
  export type productDataTypeKey = keyof productDataType