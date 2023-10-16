import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/Users';
import { ToastContainer, toast } from 'react-toastify';
 
function Update({u}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch=useDispatch()
  const schema=yup.object().shape({
    firstName:yup.string().required(),
    lastName:yup.string().required(),
    email:yup.string().email().required(),
    age:yup.number().positive().integer().required(),
    contact:yup.number().positive().integer().required()
  })
  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(schema)
  })
  const formData=(data)=>{
    data.id=u.id
    dispatch(updateUser(data))
    toast('User Updated')
    setShow(false)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className='d-flex align-items-center  justify-content-around flex-column'
            style={{width:'100%',minHeight:'350px',height:'auto'}}
            onSubmit={handleSubmit(formData)}
            >
                <input type="text" {...register('firstName')}className='form-control' defaultValue={u.firstName} />
                <p>{errors.firstName?.message}</p>
                <input type="text" {...register('lastName')}className='form-control' defaultValue={u.lastName} />
                <p>{errors.lastName?.message}</p>
                <input type="text" {...register('email')}className='form-control' defaultValue={u.email} />
                <p>{errors.email?.message}</p>
                <input type="text" {...register('age')}className='form-control' defaultValue={u.age} />
                <p>{errors.age?.message}</p>
                <input type="text" {...register('contact')}className='form-control' defaultValue={u.contact} />
                <p>{errors.contact?.message}</p>
                <button className='btn btn-secondary col-8'>Update</button>
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

export default Update;