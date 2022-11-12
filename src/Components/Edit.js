import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const Edit = () => {
     //state managment
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [phone, setPhone]=useState('')
   
    const {id} =useParams();
    const contacts = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    useEffect(()=>{
        if(currentContact){
            setName(currentContact.name);
            setEmail(currentContact.email);
            setPhone(currentContact.phone);
        }
    },[currentContact]);

    const handelSubmit = e => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
        const checkPhone = contacts.find(contact => contact.id !== parseInt(id) && contact.phone === parseInt(phone));

        if (!email || !phone || !name) {
            return toast.warning("Please fill  all fields!");
        }

        if (checkEmail) {
            return toast.error("This email already Exists!");
        }

        if (checkPhone) {
            return toast.error("This number already Exists!");
        }

        const data = {
            id: parseInt(id),
            name,
            email,
            phone
        }

        dispatch({ type: 'UPDATE_CONTACT', payload: data });
        toast.success("Contact updated successfully!!")
        navigate('/');
    };


  return (
    <div className='container'>
    {
        currentContact ? (
            <>
                <h1 className='display-3 text-center fw-bold'>Edit Contact {id}</h1>
                <div className='row'>
                    <div className='col-md-6 shadow mx-auto p-5'>
                        <form className='text-center' onSubmit={handelSubmit}>
                            <div className='form-group mb-3'>
                                <input type='text' placeholder='Name' className='form-control'
                                    value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className='form-group mb-3'>
                                <input type='email' placeholder='Email' className='form-control'
                                    value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className='form-group mb-3'>
                                <input type='number' placeholder='Phone Number' className='form-control'
                                    value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div className='form-group mb-3'>
                                <input type='submit' value='Update Contact' className='btn btn-dark' />
                                <Link to='/' className='btn btn-danger ms-3 '>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div >
            </>
        ) : (
            <h1 className='display-3 my-5 text-center fw-bold'>Contact with id {id} does not exists!!</h1>
        )
    }

</div >
)
}

export default Edit