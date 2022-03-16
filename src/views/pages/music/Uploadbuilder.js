
// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import {
    Row,
    Label,
    Input,
    Form,
    Button,
    Card,
    CardBody,
    Alert
} from 'reactstrap'
import MusicFilesUpload from '../../forms/form-elements/file-uploader/MusicUpload'
import { AlertCircle } from 'react-feather'

const Uploadbuilder = () => {


    return (
        <Fragment>
            <div style={{ paddingBottom: 20 }}>
                <h2 className='mb-0'>Upload your music</h2>
            </div>
            <div className='content-header'>
                <h4 className='mb-0'><strong>1. </strong> Tracks and metadata</h4>
                <small>Add your tracks and arrange them into the order you want them to appear on stores.</small>
            </div>
            <Card className='mb-0'>
                <CardBody>
                    <MusicFilesUpload title='Upload music' header='Drop Files here or click' />
                </CardBody>
            </Card>

            <div className='divider divider-success'>
                <div className='divider-text'>Checklist</div>
            </div>

            <Card className='mb-10'>
                <CardBody>
                    <div>
                        <Alert color='success'>
                            <h4 className='alert-heading'>
                                <AlertCircle size={20} />{' '}
                                Please complete the following checklist before proceeding
                            </h4>
                            <div className='alert-body'>
                                Please note that answering incorrectly to any of the following questions may result in delays to your music being sent to retailers.
                            </div>
                        </Alert>
                    </div>
                    <div className='form-check form-check-success' style={{ marginTop: 10 }}>
                        <Input type='checkbox' id='tracks' />
                        <Label className='form-check-label' for='tracks'>
                            I understand my release may be rejected from stores if I don't correctly label tracks as explicit that contain swear words or obscenities.
                        </Label>
                    </div>
                    <div className='form-check form-check-success' style={{ marginTop: 10 }}>
                        <Input type='checkbox' id='authorised' />
                        <Label className='form-check-label' for='authorised'>
                            I am authorised to distribute this music to stores and territories I select.
                        </Label>
                    </div>
                    <div className='form-check form-check-success' style={{ marginTop: 10 }}>
                        <Input type='checkbox' id='artist-name' />
                        <Label className='form-check-label' for='artist-name'>
                            I'm not using any other artist's name in my name, song titles, or album title, without their approval.
                        </Label>
                    </div>
                </CardBody>
            </Card>
            <div style={{ paddingBottom: 20 }}>
                <h4 className='mb-0'><strong>2. </strong>Covers and copyrighted materials</h4>
            </div>
            <Card>
                <CardBody>
                    <div>
                        If your release contains any copyrighted material such as samples, please upload the documentation proving you own the copyright to the audio. Without the required licensing documentation, music containing copyrighted material may be rejected by stores.
                    </div>
                    <div className='form-check form-check-success' style={{ marginTop: 10 }}>
                        <Input type='radio' id='artist-name' />
                        <Label className='form-check-label' for='artist-name'>
                            I'm not using any other artist's name in my name, song titles, or album title, without their approval.
                        </Label>
                    </div>
                    <div className='form-check form-check-success' style={{ marginTop: 10 }}>
                        <Input type='radio' id='artist-name' />
                        <Label className='form-check-label' for='artist-name'>
                            I'm not using any other artist's name in my name, song titles, or album title, without their approval.
                        </Label>
                    </div>
                </CardBody>
            </Card>
        </Fragment>

    )
}
export default Uploadbuilder
