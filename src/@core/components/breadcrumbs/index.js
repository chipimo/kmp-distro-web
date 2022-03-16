// ** React Imports
import { useState, Fragment, useContext, useEffect } from 'react'
// ** React Imports
import { useHistory } from 'react-router-dom'
// ** Actions
import { handleLogin } from '@store/authentication'
// ** Context
import { AbilityContext } from '@src/utility/context/Can'
// ** Third Party Components
import Proptypes from 'prop-types'
// ** Custom Components
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Reactstrap Imports
import {
  Breadcrumb,
  Row,
  Col,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Progress,
  Label,
  Form,
  Button
} from 'reactstrap'

const BreadCrumbs = props => {
  // ** Props
  const { breadCrumbTitle,
    breadCrumbParent,
    breadCrumbParent2,
    breadCrumbParent3,
    breadCrumbActive,
    breadCrumbParentTitle } = props
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
    <div className='content-header row'>
      <div className='content-header-left col-md-9 col-12 mb-2'>
        <div className='row breadcrumbs-top'>
          <div className='col-12'>
            {breadCrumbTitle ? <h2 className='content-header-title float-start mb-0'>{breadCrumbTitle}</h2> : ''}
            <div className='breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12'>
              <Breadcrumb>
                <BreadcrumbItem tag='li'>
                  {breadCrumbParentTitle}
                </BreadcrumbItem>
                <BreadcrumbItem tag='li' className='text-primary'>
                  {breadCrumbParent}
                </BreadcrumbItem>
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    {breadCrumbParent2}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    {breadCrumbParent3}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                <BreadcrumbItem tag='li' active>
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className='content-header-right text-md-end col-md-3 col-12 d-md-block d-none'>
        <div className='breadcrumb-right dropdown'>
          <Button.Ripple onClick={() => setVisibility(!visibility)} outline color='primary' >
            Create New
          </Button.Ripple>
        </div>
      </div>
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

              <Button.Ripple outline color='success' type='submit' >
                Create
              </Button.Ripple>
            </Form>
          </Fragment>
        </ModalBody>

      </Modal>
    </div>
  )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired
}
