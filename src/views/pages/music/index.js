// ** React Imports
import { useState, Fragment, useEffect, useContext } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Progress,
  Label,
  Form
} from 'reactstrap'

// ** Custom Components
import Card from '@components/card-snippet'
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

// ** Actions
import { handleLogin } from '@store/authentication'
// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Import Account type
import AccountType from '../account-settings/AccountType'

// ** Utils
import { isUserLoggedIn } from '@utils'

import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'

// ** TabsIcons 
import TabsIcons from '../../components/tabs/TabsIcons'

//  ** Import navigation 
import { useHistory } from "react-router-dom"

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'

const MusicPage = () => {
  // ** State
  const [visibility, setVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(null)

  // ** Hooks
  const dispatch = useDispatch()
  const history = useHistory()
  const ability = useContext(AbilityContext)

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const onSubmit = async data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setIsLoading(true)
      const tempId = uuidv4()

      useJwt
        .createRelease({ releaseTitle: data.releaseTitle, userData, id: tempId })
        .then(res => {
          // console.log(res)
          setIsLoading(false)

          if (res.status === 200) {
            const dataRes = { ...res.data.result, accessToken: res.data.result.accessToken, refreshToken: res.data.result.refreshToken }
            dispatch(handleLogin(dataRes))
            ability.update(res.data.result.ability)
            history.push({
              pathname: '/music-release',
              state: { title: data.releaseTitle, id: tempId }
            })
          }

        })
        .catch((e) => console.log(e))

    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }


  return (
    <>
      <div id='dashboard-analytics'>
        {/* <div className='text-center'>
          <h1 className='mb-1 text-white'>My Music</h1>
          <p className='text-white'>
            Ready to get your music out there?
          </p>
          <p className='text-white'>
              We've got you covered, just select a type of release to start with:
          </p>
      </div> */}
        <Row className='match-height'>
          <Col lg='6' sm='12'>
            <CardCongratulations
              subText="Release Your Music Worldwide Enjoy Free Upgrades & Support"
              onButtonClick={() => {
                // history.push('/music-release')
                setVisibility(!visibility)
              }}
              buttonText="Create New"
              headerText="Music Release"
              topLeftColor=""
            />
          </Col>

          <Col lg='6' sm='12'>
            <CardCongratulations
              subText="You might be missing out on royalties you didn’t know existed!"
              buttonText="Create New"
              headerText="Video Release"
            />
          </Col>
        </Row>
        {/* ** Modal for music upload  */}

        <Modal
          backdrop="static"
          modalClassName='modal-success'
          isOpen={visibility}
          toggle={() => setVisibility(!visibility)}
          unmountOnClose={true}
        >
          <ModalHeader toggle={() => { if (!isLoading) setVisibility(!visibility) }}>Creat New Release</ModalHeader>
          <ModalBody>
            <Fragment>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for={`name-title`} >
                    Title of Album, EP or single
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='releaseTitle'
                    name='releaseTitle'
                    render={({ field }) => (
                      <Input
                        disabled={isLoading}
                        {...field}
                        placeholder='Title, EP or single'
                        invalid={errors.releaseTitle && true}
                      />
                    )
                    }
                  />

                </Col>
                {
                  isLoading ? <div style={{ marginBottom: 15 }}>
                    <Label className='form-label' for={`name-title`} >
                      Creating Please wait
                    </Label>
                    <Progress animated striped value={100} />
                  </div> : null
                }

                <Button.Ripple disabled={isLoading} outline color='success' type='submit' >
                  Create
                </Button.Ripple>
              </Form>
            </Fragment>
          </ModalBody>

        </Modal>

        <AccountType />

        <Card iconCode={
          <UncontrolledButtonDropdown>
            <Button outline color='secondary'>
              Filter by:
            </Button>
            <DropdownToggle outline className='dropdown-toggle-split' color='secondary' caret></DropdownToggle>
            <DropdownMenu>
              <DropdownItem href='/' tag='a'>Option 1</DropdownItem>
              <DropdownItem href='/' tag='a'>Option 2</DropdownItem>
              <DropdownItem href='/' tag='a'>Option 3</DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem href='/' tag='a'>Separated Link</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        } title='My Releases' >
          <TabsIcons />
        </Card>
      </div>
    </>
  )
}

export default MusicPage
