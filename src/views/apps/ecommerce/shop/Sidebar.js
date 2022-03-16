// ** Custom Hooks
// import { useRTL } from '@hooks/useRTL'

// ** Third Party Components
// import wNumb from 'wnumb'
import classnames from 'classnames'
import { Star } from 'react-feather'
import Nouislider from 'nouislider-react'

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label } from 'reactstrap'

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'

const Sidebar = props => {
  // ** Props
  const { sidebarOpen } = props

  // ** Hooks
  // const [isRtl] = useRTL()

  // ** Array of brands
  const brands = [
    {
      title: 'Insignia™',
      total: 746
    },
    {
      title: 'Samsung',
      total: 633,
      checked: true
    },
    {
      title: 'Metra',
      total: 591
    },
    {
      title: 'HP',
      total: 530
    },
    {
      title: 'Apple',
      total: 422,
      checked: true
    }
  ]


  return (
    <div className='sidebar-detached sidebar-left '>
      <div className='sidebar'>
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen
          })}
        >
          <Row>
            <Col sm='12'>
              <h6 className='filter-heading d-none d-lg-block'>Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div className='multi-range-price'>
                <h6 className='filter-title mt-0'>Multi Range</h6>
                <ul className='list-unstyled price-range'>
                  <li>
                    <div className='form-check'>
                      <Input type='radio' id='all' name='price-range-radio' defaultChecked />
                      <Label className='form-check-label' for='all'>
                        All
                      </Label>
                    </div>
                  </li>
                  <li>
                    <div className='form-check'>
                      <Input type='radio' id='10-dollars-below' name='price-range-radio' />
                      <Label className='form-check-label' for='10-dollars-below'>{`<=$10`}</Label>
                    </div>
                  </li>
                  <li>
                    <div className='form-check'>
                      <Input type='radio' id='10-100-dollars' name='price-range-radio' />
                      <Label className='form-check-label' for='10-100-dollars'>
                        $10-$100
                      </Label>
                    </div>
                  </li>
                  <li>
                    <div className='form-check'>
                      <Input type='radio' id='100-500-dollars' name='price-range-radio' />
                      <Label className='form-check-label' for='100-500-dollars'>
                        $100-$500
                      </Label>
                    </div>
                  </li>
                  <li>
                    <div className='form-check'>
                      <Input type='radio' id='500-dollars-above' name='price-range-radio' />
                      <Label className='form-check-label' for='500-dollars-above'>{`>=$500`}</Label>
                    </div>
                  </li>
                </ul>
              </div>
             
            
              <div className='brands'>
                <h6 className='filter-title'>Brands</h6>
                <ul className='list-unstyled brand-list'>
                  {brands.map(brand => {
                    return (
                      <li key={brand.title}>
                        <div className='form-check'>
                          <Input type='checkbox' id={brand.title} defaultChecked={brand.checked} />
                          <Label className='form-check-label' for={brand.title}>
                            {brand.title}
                          </Label>
                        </div>
                        <span>{brand.total}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>

            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
