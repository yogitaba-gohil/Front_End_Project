import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline } from '@mui/icons-material'

import { useProductsContext } from '../context/products_context'
import EditProductPage from './EditProductPage'

const AdminContent = () => {
  const { allProducts, removeProduct } = useProductsContext()
  const [data, setData] = useState(allProducts)
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [productId, setProductId] = useState()

  useEffect(() => {
    setData(allProducts)
  }, [allProducts])

  const handleDelete = (id: any) => {
    removeProduct(id)
  }
  const handleEdit = (id: any, arg: boolean) => {
    setProductId(id)
    setIsEdit(arg)
  }
  const handleAdd = (arg: boolean) => {
    setIsEdit(arg)
    setIsAdd(true)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'product',
      headerName: 'Product',
      width: 200,
      renderCell: (params: any) => {
        return <div className="productListItem">{params.row.name}</div>
      }
    },
    {
      field: 'categories',
      headerName: 'Category',
      width: 160
    },
    {
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
            <button className="productListEdit" onClick={() => handleEdit(params.row.id, true)}>
              Edit
            </button>
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
        {isEdit ? (
          <EditProductPage handleEdit={handleEdit} productId={productId} isAdd={isAdd} />
        ) : (
          <div>
            <div className="buttonContainer">
              <button className="productAddButton" onClick={() => handleAdd(true)}>
                Add
              </button>
            </div>{' '}
            <DataGrid rows={data} columns={columns} checkboxSelection autoHeight  hideFooter={true} />{' '}
          </div>
        )}
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
export default AdminContent
