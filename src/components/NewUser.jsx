import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useDispatch,useSelector} from 'react-redux'
import {saveUser} from '../redux/Users'
import { ToastContainer, toast } from 'react-toastify';

function NewUser() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch=useDispatch()
    const {users}=useSelector(state=> state.users)
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        age: yup.number().integer().positive().required(),
        contact: yup.number().integer().positive().required()
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const formData = (data) => {
        dispatch(saveUser(data))
        toast('User Saved')
        reset()
    }

    return (
        <>
            <Button variant="primary col-8" onClick={handleShow}>
                New User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        style={{ width: '100%', minHeight: '350px', height: 'auto' }}
                        className='d-flex align-items-center justify-content-around flex-column'
                        onSubmit={handleSubmit(formData)}
                    >
                        <input type="text" {...register('firstName')} className='form-control' placeholder='First Name' />
                        <p>{errors.firstName?.message}</p>
                        <input type="text" {...register('lastName')} className='form-control' placeholder='Last Name' />
                        <p>{errors.lastName?.message}</p>
                        <input type="text" {...register('email')} className='form-control' placeholder='Email' />
                        <p>{errors.email?.message}</p>
                        <input type="text" {...register('age')} className='form-control' placeholder='Age' />
                        <p>{errors.age?.message}</p>
                        <input type="text" {...register('contact')} className='form-control' placeholder='Contact' />
                        <p>{errors.contact?.message}</p>
                        <button className='btn btn-secondary col-8'>Sign Up</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer/>
        </>
    );
}

export default NewUser;