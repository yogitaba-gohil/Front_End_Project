import styled from 'styled-components'
import { PermIdentity, Storefront } from '@mui/icons-material'

function Sidebar(props:any) {
  const onBtnClick = (arg: string) => {
    props.handleChange(arg)
  }
  return (
    <Wrapper>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h4 className="sidebarTitle">Dashboard</h4>
            <ul className="sidebarList">
              <button className="link" onClick={(e) => onBtnClick('users')}>
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </button>
              <button className="link" onClick={(e) => onBtnClick('products')}>
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Products
                </li>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .sidebar {
    flex: 1;
    height: calc(100vh - 50px);
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
  }

  .sidebarWrapper {
    padding: 20px;
    color: #555;
  }

  .sidebarMenu {
    margin-bottom: 10px;
  }

  .sidebarTitle {
    font-size: 16px;
    color: rgb(187, 186, 186);
  }

  .sidebarList {
    list-style: none;
    padding: 5px;
  }

  .sidebarListItem {
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
  }

  .sidebarListItem.active,
  .sidebarListItem:hover {
    background-color: rgb(240, 240, 255);
  }

  .sidebarIcon {
    margin-right: 5px;
    font-size: 20px !important;
  }
`
export default Sidebar
