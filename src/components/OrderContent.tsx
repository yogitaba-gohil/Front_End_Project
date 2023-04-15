import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'

import { useCartContext } from '../context/cart_context'


const OrderContent = () => {
  const { orders } = useCartContext()
  
 
  const columns = [
    { field: 'id', headerName: 'OrderID', width: 90 },
    { field: 'userId', headerName: 'UserID', width: 90 },

    {
      field: 'products',
      headerName: 'ProductsId',
      width: 200,
      renderCell: (params: any) => {
        return <div className="productListItem">
          {params.row.products.map((product:any)=>(
            <div key={product.id}>
              {product.id} &nbsp;
              </div>

          ))}

        </div>
      }
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 160
    },
   
    
  ]

  return (
    <Wrapper>
      <div className="productList">
        
          <div>
            <DataGrid rows={orders} columns={columns} checkboxSelection autoHeight  hideFooter={true} />
          </div>
        
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .productList {
    flex: 4;
  }
  .buttonContainer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .productListItem {
    display: flex;
    align-items: center;
  }
  .productAddButton {
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin: 10px;
  }
  .productListImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  .productListEdit {
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
  }

  .productListDelete {
    color: red;
    cursor: pointer;
  }
`
export default OrderContent

