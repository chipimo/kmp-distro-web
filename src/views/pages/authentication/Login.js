// ** React Imports
import { useContext, Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Custom Hooks
// import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components 
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import GoogleLogin from 'react-google-login'
import { AlertCircle, HelpCircle, Coffee } from 'react-feather'
// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ name }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title fw-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)

const defaultValues = {
  password: '',
  loginEmail: ''
}

const Login = () => {
  // ** Hooks
  // const { skin } = useSkin()
  const dispatch = useDispatch()
  const history = useHistory()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const [visible, setVisible] = useState(false)
  // const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
  const source = require(`@src/assets/images/pages/3974-ai.png`).default
  const logoImg = require(`@src/assets/images/logo/logo.png`).default

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      useJwt
        .login({ email: data.loginEmail, password: data.password })
        .then(res => {
          // console.log(res)
          const data = { ...res.data.result.userData, accessToken: res.data.result.accessToken, refreshToken: res.data.result.refreshToken }
          dispatch(handleLogin(data))
          ability.update(res.data.result.userData.ability)
          history.push(getHomeRouteForLoggedInUser(data.role))
          toast.success(
            <ToastContent name={data.fullName || data.username || 'Mulenga'} role={data.role || 'admin'} />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        })
        .catch(() => setVisible(true))
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
  
  const responseGoogle = (response) => {
    console.log(response)
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
        <img className="inner-logo-icon" src={logoImg} alt='Logo' />
          <h2 className='brand-text text-primary ms-1' >Distribution</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to KMP Distribution! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Alert color='danger' isOpen={visible}>
            <div className='alert-body'>
              <AlertCircle size={15} />{' '}
              <span className='ms-1'>
                <strong>Email or Password invalid!</strong>
              </span>
            </div>
            </Alert>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='Mulenga@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button type='submit' color='primary' block>
                Sign in
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              {/* <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button> */}
              <GoogleLogin
                clientId="113649802903-q3cse3c34bd0riineki2v6a120mc1omj.apps.googleusercontent.com"
                buttonText="continue with google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
