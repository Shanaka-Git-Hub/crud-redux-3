import React, { useState } from 'react'
import NewUser from './components/NewUser'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from './redux/Users'
import { ToastContainer, toast } from 'react-toastify'
import Update from './components/Update'

export default function App() {


  const users = useSelector(state => state.users)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const [userNum,setUserNum]=useState(1)
  const findDelete = (id, name) => {
    if (confirm('Are you suer')) {
      dispatch(deleteUser(id))
      toast(`User ${name} was deleted`)
    }
  }

  return (
    <div className='container-fluid' style={{ height: '100vh' }}>
      <div style={{ width: '100%', height: '100px' }} className='d-flex align-items-center justify-content-center'>
        <NewUser />
      </div>
      <input type="text" className='form-control' placeholder='Search Here'
        onChange={(e) => setSearch(e.target.value)} />
      <table className='table table-hover mt-2'>
        <thead>
          <tr>
            <th>FirstName</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {
            users.filter(e => search == '' ? e : e.firstName.toLowerCase().includes(search.toLowerCase()))
              .map((e, index) => (
                <tr key={index}>
                  <td>{index<=10 ? `00${index+1}` : index+1}</td>
                  <td>{e.firstName}</td>
                  <td>{e.lastName}</td>
                  <td>{e.email}</td>
                  <td>{e.age}</td>
                  <td>{e.contact}</td>
                  <td><button className='btn btn-danger' onClick={() => findDelete(e.id, e.firstName)}>Delete</button></td>
                  <td><Update u={e} /></td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <ToastContainer />
    </div>
  )
}
