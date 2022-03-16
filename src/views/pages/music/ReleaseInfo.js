
// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Input,
    Form,
    Button,
    Card,
    CardBody,
    Dropdown,
    InputGroup,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Label,
    Alert,
    CardImg,
    CardFooter,
    CardHeader
} from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import Select from 'react-select'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Icons Imports
import { X, Plus, Edit, AlertCircle } from 'react-feather'
import FileUploaderRestrictions from '../../forms/form-elements/file-uploader/FileUploaderRestrictions'

import img3 from '@src/assets/images/slider/10.jpg'

const ErrorToast = () => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <Avatar size='sm' color='danger' icon={<X size={12} />} />
                <h6 className='toast-title'>Error!</h6>
            </div>
            <small className='text-muted'>a second ago</small>
        </div>
        <div className='toastify-body'>
            <span role='img' aria-label='toast-text'>
                👋 You can only upload image Files!.
            </span>
        </div>
    </Fragment>
)

const ReleaseInfo = ({ navigation, type }) => {
    const [yearList, setYearList] = useState({ list: [] })
    // eslint-disable-next-line no-unused-vars
    const [RecordLabels, setRecordLabels] = useState({ list: [{ value: 'independent', label: 'Independent' }] })
    const [dropdownIcon, setDropdownIcon] = useState(false)
    const [dropdownRight, setDropdownRight] = useState(false)

    const toggleDropdownIcon = () => {
        setDropdownIcon(!dropdownIcon)
    }
    const toggleDropDownRight = () => {
        setDropdownRight(!dropdownRight)
    }


    useEffect(() => {
        const currentYear = (new Date()).getFullYear()
        // eslint-disable-next-line no-mixed-operators
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => {
            return { value: start + (i * step), label: start + (i * step) }
        })
        if (navigation !== undefined) console.log(navigation)

        setYearList({ ...yearList, list: range(currentYear, currentYear - 50, -1) })
    }, [])

    return (
        <Fragment>
            <div className='content-header'>
                <h4 className='mb-0'><strong>1. </strong> Release Information</h4>
                <small>Enter Your Details.</small>
            </div>
            <Form onSubmit={e => e.preventDefault()}>
                <Card className='mb-0'>
                    <CardBody>

                        <Row>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label' for={`name-${type}`} >
                                    Title of Album, EP or single
                                </Label>
                                <Input type='text' name='title' id='nameMulti' placeholder='Title, EP or single' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label'>Copyright Holder</Label>
                                <Input type='text' name='holder' id='Holder' placeholder='Copyright Holder' />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label' for='CountryMulti'>
                                    Copyright Year
                                </Label>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={yearList.list[0]}
                                    name='copyrightsYear'
                                    options={yearList.list}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label' for='CompanyMulti'>
                                    Record label
                                </Label>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={RecordLabels.list[0]}
                                    name='recordLabel'
                                    options={RecordLabels.list}
                                />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label' for='CompanyMulti'>
                                    Create label
                                </Label>
                                <div>
                                    <Button.Ripple outline color='primary'>
                                        <Plus size={14} />
                                        <span className='align-middle ms-25'>New Label</span>
                                    </Button.Ripple>
                                </div>
                            </Col>
                        </Row>


                    </CardBody>
                </Card>
                <div style={{ heigth: 10, padding: 10 }}></div>
                <Card className='mb-0'>
                    <CardBody>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label'>Release artist(s) </Label>
                            <Input type='text' name='holder' id='Holder' placeholder='Copyright Holder' />
                        </Col>
                        <Row>

                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label'>Which artist(s) do you want to release under?</Label>
                                <InputGroup>
                                    <Dropdown isOpen={dropdownIcon} toggle={toggleDropdownIcon}>
                                        <DropdownToggle color='dark' caret outline>
                                            <Edit size={12} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Action 1</DropdownItem>
                                            <DropdownItem disabled>Action</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>Another Action</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Input />
                                    <Dropdown isOpen={dropdownRight} toggle={toggleDropDownRight}>
                                        <DropdownToggle color='dark' outline caret>
                                            Action
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Action 1</DropdownItem>
                                            <DropdownItem disabled>Action</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>Another Action</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </InputGroup>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                                    <Button.Ripple outline color='dark'>
                                        <Plus size={14} />
                                        <span className='align-middle ms-25'>New Label</span>
                                    </Button.Ripple>
                                    <Button.Ripple outline color='dark'>
                                        <Plus size={14} />
                                        <span className='align-middle ms-25'>New Label</span>
                                    </Button.Ripple>
                                </div>
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Alert color='warning'>
                                    <h4 className='alert-heading'>Your release can be listed under more than one artist.</h4>
                                    <div className='alert-body'>
                                        Use the additional artist row to compose the full release artist name.
                                        <br />Ex: <em>Macky 2 </em>and <em>Yo Maps</em> (feat. Slap Dee)
                                    </div>
                                </Alert>
                            </Col>
                        </Row>

                    </CardBody>
                </Card>
                {/* <Button color='success' className='btn-submit' onClick={() => console.log(stepper)}>
                    Submit
                </Button> */}
                <div className='divider divider-success'>
                    <div className='divider-text'>Step 2 | Release artwork</div>
                </div>

                <div className='content-header'>
                    <h4 className='mb-0'><strong>2. </strong> Release artwork</h4>
                    <small>Enter Your Details.</small>
                </div>

                <Card className='mb-0'>
                    <CardBody>
                        <div>
                            <Alert color='warning'>
                                <h4 className='alert-heading'>
                                    <AlertCircle size={15} />{' '}
                                    Artwork requirements:
                                </h4>
                                <div className='alert-body'>
                                    Cover art must be a square .jpg or .jpeg file, at least 3000x3000 pixels, not blurry or pixelated and no more than 10mb in size.
                                    <br />
                                    <br />

                                    Cover art cannot contain:
                                    <br />

                                    - Social media logos or handles
                                    <br />
                                    - Website links or brand/record label logos
                                    <br />
                                    - Any text except for artist names and/or the name of the release
                                    <br />
                                    <br />

                                    If your cover art contains any of the above, we will have to reject your release. These rules are set by the music stores and we have to follow them.
                                </div>
                            </Alert>
                        </div>
                        <Row>
                            <Col md='6' sm='12' className='mb-1'>
                                <Card className='text-white border-0'>
                                    <CardImg top src={img3} alt='card-overlay' />
                                </Card>
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <FileUploaderRestrictions title='Upload cover'  header='Drop Files here or click' />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <div className='divider divider-success'>
                    <div className='divider-text'>Step 3 | Release genres</div>
                </div>

                <div className='content-header'>
                    <h4 className='mb-0'><strong>3. </strong> Release genres</h4>
                    <small>Select Your Release genres.</small>
                </div>

                <Card className='mb-0'>
                    <CardBody>
                        <Row>
                            <Col md='4' sm='12' className='mb-1'>
                                <Label className='form-label' for='CountryMulti'>
                                    Primary genre
                                </Label>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={yearList.list[0]}
                                    name='copyrightsYear'
                                    options={yearList.list}
                                />
                            </Col>
                            <Col md='4' sm='12' className='mb-1'>
                                <Label className='form-label' for='CountryMulti'>
                                    Secondary genre
                                </Label>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={yearList.list[0]}
                                    name='copyrightsYear'
                                    options={yearList.list}
                                />
                            </Col>

                            <Col md='4' sm='12' className='mb-1'>
                                <Label className='form-label' for='CountryMulti'>
                                    Language
                                </Label>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={yearList.list[0]}
                                    name='copyrightsYear'
                                    options={yearList.list}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md='8' sm='12' className='mb-1'>
                                <Alert color='warning'>
                                    <div className='alert-body'>
                                        <AlertCircle size={25} />{' '}
                                        Not all the genres are available on every store. When a genre you have selected does not exist on a specific store, we will select the closest alternative.
                                        The stores we distribute to will use this info when they categorize your release.
                                        You must select a primary genre, but including secondary genre is optional.
                                    </div>
                                </Alert>
                            </Col>
                            <Col md='4' sm='12' className='mb-1'>
                                <Alert color='warning'>
                                    <div className='alert-body'>
                                        <AlertCircle size={25} />{' '}
                                        If your tracks have no lyrics, this can be used to target a language-specific audience.
                                    </div>
                                </Alert>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

            </Form>

        </Fragment>

    )
}
export default ReleaseInfo
