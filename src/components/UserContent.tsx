import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom'

import { useUserContext } from '../context/user_context'

const UserContent = () => {
  const { users } = useUserContext()
  const [allUsers, setAllUsers] = useState(users)

  useEffect(() => {
    return setAllUsers(users)
  }, [users])

  const handleDelete = (email: any) => {
    if (allUsers?.length) {
      setAllUsers(allUsers.filter((item) => item.email !== email))
    }
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: (params: any) => {
        return <div className="productListItem">{params.row.email}</div>
      }
    },
    {
      field: 'password',
      headerName: 'Password',
      width: 160
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 160,
      renderCell: (params: any) => {
        return <div className="productListItem">{params.row.isAdmin ? 'Admin' : 'user'}</div>
      }
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
        <DataGrid rows={allUsers} columns={columns} checkboxSelection autoHeight   hideFooter={true}/>
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
export default UserContent
