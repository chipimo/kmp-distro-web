// ** React Imports
import { useRef, useState, useEffect, Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import Wizard from '@components/wizard'

// ** Icons Imports
import { FileText, User, ArrowLeft, Link, X, Image, Music } from 'react-feather'


// ** Reactstrap Imports
import {
    Button
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss'
import ReleaseInfo from './ReleaseInfo'
import Uploadbuilder from './Uploadbuilder' 
import Schedule from './Schedule' 

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

const MusicForm = (props) => {

    // ** Ref
    const ref = useRef(null)

    useEffect(() => {
    //   console.log(props)
    }, [])
         

    // ** State
    const [stepper, setStepper] = useState(null)

    const steps = [
        {
            id: 'release-details',
            title: 'Release Details',
            subtitle: 'Enter Your Release Details.',
            icon: <FileText size={18} />,
            content: <ReleaseInfo navigation={props} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'track-list',
            title: 'Track List',
            subtitle: 'Enter Your Track List.',
            icon: <FileText size={18} />,
            content: <Uploadbuilder stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'schedule',
            title: 'Schedule',
            subtitle: 'Enter Schedule.',
            icon: <FileText size={18} />,
            content: <Schedule stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'distribution',
            title: 'Distribution',
            subtitle: 'Distribution.',
            icon: <FileText size={18} />,
            content: <ReleaseInfo stepper={stepper} type='wizard-modern' />
        }

    ]

    return (
        <Fragment>

            <div className='modern-horizontal-wizard'>
                <Wizard
                    type='modern-horizontal'
                    ref={ref}
                    steps={steps}
                    options={{
                        linear: false
                    }}
                    instance={el => setStepper(el)}
                    
                />
            </div>

            <div className='d-flex justify-content-between'>
                <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                    <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                    <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                </Button>
            </div>

        </Fragment>
    )
}
export default MusicForm
