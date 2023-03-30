import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom'

import { useProductsContext } from '../context/products_context'



const AdminContent = () => {
  const { allProducts } = useProductsContext()
  const [data, setData] = useState(allProducts)

  console.log('data', data)

useEffect(()=>{
  setData(allProducts)
},[allProducts])

  const handleDelete = (id:any) => {
    setData(data.filter((item) => item.id !== id))
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'product',
      headerName: 'Product',
      width: 200,
      renderCell: (params: any) => {
        console.log('params', params.row.name)
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            {params.row.name}
          </div>
        )
      }
    },
    {
      field: 'categories',
      headerName: 'Category',
      width: 160
    }, {
      field: 'price',
      headerName: 'Price',
      width: 160
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Link to={'/product/' + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        )
      }
    }
  ]

  return (
    <Wrapper>
    <div className="productList">
     <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        autoHeight
      />
    </div>
  </Wrapper>
  )
}


const Wrapper = styled.div`
  .productList {
    flex: 4;
  }

  .productListItem {
    display: flex;
    align-items: center;
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
export default AdminContent
