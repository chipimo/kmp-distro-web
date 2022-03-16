// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment } from 'react'

// ** Third Party Components
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import {
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Button
} from 'reactstrap'

const NavbarBookmarks = props => {
  // ** Props
  const { setMenuVisibility } = props

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none'>
        <NavItem className='mobile-menu me-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      <ul className='nav navbar-nav bookmark-icons' style={{marginLeft: 70}}>
        <NavItem className='d-none d-lg-block'>
            <NavLink tag='span'>
              <UncontrolledDropdown>
                <DropdownToggle tag='span'>
                  <Button className='align-middle' color='secondary' outline style={{cursor: 'pointer', marginLeft: 6}}>
                    Create new
                  </Button>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem tag={Link} to='/pages/profile'>
                    <Icon.Music size={14} className='me-75' />
                    <span className='align-middle'>Music Release</span>
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/pages/profile'>
                    <Icon.Video size={14} className='me-75' />
                    <span className='align-middle'>Video Release</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavLink>
          </NavItem>
      </ul>
    </Fragment>
  )
}

export default NavbarBookmarks
