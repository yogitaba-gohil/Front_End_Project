import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { useProductsContext } from '../context/products_context'
import Loading from './Loading'
import ErrorPage from '../pages/ErrorPage'

function EditProductPage(props: any) {
  const { singleProduct, fetchSingleProduct, singleProductLoading, singleProductError, udpateProductDetails } =
    useProductsContext()
  const [productData, setProductData] = useState({})

  useEffect(() => {
    if (props.productId) {
      fetchSingleProduct(props.productId)
      setProductData(singleProduct)
    }
  }, [props.id, singleProduct])

  const handleBack = () => {
    props.handleEdit('', false)
  }
 
  const handleChange = (event: any) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setProductData((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleUpdateProductDetails = (event: Event ) => {
    event.preventDefault();
    udpateProductDetails(productData)
    props.handleEdit('', false)

  }

  if (singleProductLoading) {
    return <Loading />
  }
  if (singleProductError) {
    return <ErrorPage />
  } else {
    return (
      <Wrapper>
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <div className="buttonContainer">
            <button className="productAddButton" onClick={handleBack}>
              Back
            </button>

            </div>
           
            
          </div>
          <div className="productBottom">
            <form className="productForm">
            <div className="productFormLeft">
                <label>Id</label>
                <input
                  type="text"
                  placeholder="Enter Product Id"
                  name="id"
                  defaultValue={productData.id}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              
              <div className="productFormLeft">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  name="name"
                  defaultValue={productData.name}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="productFormLeft">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Enter Product Description"
                  name="description"
                  defaultValue={productData.description}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="productFormLeft">
                <label>Categories</label>
                <input
                  type="text"
                  placeholder="Enter Product Categories"
                  name="categories"
                  defaultValue={productData.categories}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="productFormLeft">
                <label>Price</label>
                <input
                  type="text"
                  placeholder="Enter Product Price"
                  name="price"
                  defaultValue={productData.price}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="productFormLeft">
                <label>Slug: </label>
                <input
                  type="text"
                  placeholder="Enter Product Slug"
                  name="slug"
                  defaultValue={productData.slug}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="productFormLeft">
                <label>Size</label>
                <input
                  type="text"
                  placeholder="Enter Product Size"
                  name="sizes"
                  defaultValue={productData.sizes}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              {/* <div className="productFormLeft">
                <label>Images </label>
                <input type="text" placeholder="Apple AirPod" value={productData.images[0]} />
              </div> */}
              <div className="productFormRight">
                
                <button className="productButton" onClick={(event) => handleUpdateProductDetails(event)}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    )
  }
}
const Wrapper = styled.div`
  .product {
    flex: 4;
    padding: 20px;
  }

  .productTitleContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
.buttonContainer{
  display: flex;
  align-items: center;
  justify-content: space-between;
  

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

  .productBottom {
    padding: 20px;
    margin: 20px;
    width: 50%;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  }

  .productForm {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .productFormLeft {
    display: flex;
    flex-direction: column;
  }

  .productFormLeft > label {
    margin-bottom: 10px;
    color: gray;
  }

  .productFormLeft > input {
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid gray;
  }

  .productFormLeft > select {
    margin-bottom: 10px;
  }

  .productUploadImg {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
  }

  .productFormRight {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .productUpload {
    display: flex;
    align-items: center;
  }

  .productButton {
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }
`
export default EditProductPage
