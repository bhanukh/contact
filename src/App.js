import React, { useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar';
import { Route ,Routes } from 'react-router-dom';
import Home from './Components/Home';
import Add from './Components/Add';
import Edit from './Components/Edit';
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();


  //fetch api
  useEffect(() => {
      const data = [];
      const promise = async () => {
          await fetch('https://jsonplaceholder.typicode.com/users')
              .then((response) => response.json())
              .then((json) => {
                  json.map((contact) => {
                      data.push({
                          id: contact.id,
                          name: contact.name,
                          number: contact.phone,
                          email: contact.email
                      });
                  })
              });
          dispatch({ type: 'FETCH_CONTACTS', payload: data });
      };
      promise();
  }, []);
  return (
    <div className='App'>
       <ToastContainer />
       <Navbar/>
       <Routes>
       <Route exact path="/" element={<Home />} />
       
       <Route  path="/add" element={<Add />} />
       
       <Route  path="/edit/:id" element={<Edit />} />

       
      </Routes>
    </div>
  )
}

export default App

