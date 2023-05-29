import { ProductDataType, productDataTypeKey } from '../types'

export const formatPrice = (number: number) => {
  return Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'EUR',
  }).format(number)
}
export const getUniqueValues = (
  data: ProductDataType[],
  category: productDataTypeKey,
  noAllValue?: boolean
) => {
  let unique = data
    .map(item => item[category])
    .flat()
    .filter(Boolean)
    
  if (noAllValue) {
    return [...Array.from(new Set(unique))]
  }
  return ['all', ...Array.from(new Set(unique))]
}

export function getFields(input: string | any[], field: string | number) {
  var output = "";
  for (var i=0; i < input.length ; ++i)
      output = (input[i][field]);
  return output;
}
