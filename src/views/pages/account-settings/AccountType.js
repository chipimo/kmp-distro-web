// ** Reactstrap Imports
import { Card, Button, CardHeader, CardTitle, CardBody, Alert } from 'reactstrap'


// ** Styles
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

const AccountType = () => {

  return (
    <Card>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>My Account Plan</CardTitle>
      </CardHeader>
      <CardBody className='py-2 my-25'>
        <Alert color='warning'>
          <h4 className='alert-heading'>You don't have any plan yet</h4>
          <div className='alert-body fw-normal'>
            Upgrade to Boost or Pro and let your music reach even Further! 100% Artist friendly deals.
          </div>
        </Alert>

        <div className='mt-1'>
          <Button.Ripple color='success'>Select a Plan Now</Button.Ripple>
        </div>
      </CardBody>
    </Card>
  )
}

export default AccountType
