// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import {
    Table,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Button,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Alert
} from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Imports
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'
import { X, Music, MoreVertical, Edit, Trash, Play, AlertCircle } from 'react-feather'
import ReactPaginate from 'react-paginate'
import SwiperThreeD from '@src/views/extensions/swiper/3DEffect'

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

const MusicFilesUpload = ({ title, header }) => {
    // ** State
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept: 'image/*',
        onDrop: (acceptedFiles, rejectedFiles) => {
            if (rejectedFiles.length) {
                toast.error(<ErrorToast />, { icon: false, hideProgressBar: true })
            } else {
                setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
            }
        }
    })

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>
                    <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
                </div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    const handleRemoveAllFiles = () => {
        setFiles([])
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>{title}</CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md='4' sm='12' className='mb-1'>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <div className='d-flex align-items-center justify-content-center flex-column'>
                                <Music size={64} />
                                <h5>{header}</h5>
                                <p className='text-secondary'>
                                    <a href='/' onClick={e => e.preventDefault()}>
                                        Browse
                                    </a>{' '}
                                    thorough your machine
                                </p>
                            </div>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <Alert color='warning'>
                                <h4 className='alert-heading'>
                                    <AlertCircle size={20} />{' '}
                                    Audio file requirements
                                </h4>
                                <div className='alert-body'>
                                    -  file format must be .wav or .mp3 (.wav is preferred)
                                    <br />
                                    -  file size no larger than 200Mb
                                    <br />
                                </div>
                            </Alert>

                        </div>
                    </Col>
                    <Col md='8' sm='12' className='mb-1'>
                        <div className='react-dataTable roles-table' style={{ height: 200 }}>
                            <Table size="sm" striped style={{ marginBottom: 200 }}>
                                <thead>
                                    <tr>
                                        <th>Play</th>
                                        <th>Title</th>
                                        <th>Metadata</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button.Ripple className='btn-icon rounded-circle' color='primary'>
                                                <Play size={16} />
                                            </Button.Ripple>
                                        </td>
                                        <td>Peter Charles</td>
                                        <td>
                                            Active
                                        </td>
                                        <td>
                                            status
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                                    </DropdownItem>
                                                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                        {files.length ? (
                            <Fragment>
                                <ListGroup className='my-2'>{fileList}</ListGroup>
                                <div className='d-flex justify-content-end'>
                                    <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                                        Remove All
                                    </Button>
                                    <Button color='primary'>Upload Files</Button>
                                </div>
                            </Fragment>
                        ) : null}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default MusicFilesUpload
