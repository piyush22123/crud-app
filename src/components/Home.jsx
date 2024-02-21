import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Edit from './Edit';
import '/src/App.css'
import { Link, Outlet } from 'react-router-dom'
import { adddata, updatedata, deldata } from './context/ContextProvider';

const Home = () => {


    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);

    const getData = async () => {

        const res = await fetch("http://localhost:3000/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error");
        }
        else {
            setuserdata(data);
            console.log("get data");
        }
    }

    // 
    useEffect(() => {
        getData();
    }, []);


    const deleteuser = async (id) => {

        const res2 = await fetch(`http://localhost:3000/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getData();
        }

    }


    return (
        <>
         {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
        <div className='mt-5'>
            <div className="container">
                <div className="add_btn mt-2">
                    <button className='btn btn-primary'><Link className='addbutton' to="/register">Add data</Link></button>
                </div>

                <table className="table mt-2">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Job</th>
                            <th scope="col">Mob No.</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            getuserdata.map((element, id) =>{
                                return (
                                    <>
                                        <tr key={element.id}>
                                            <th scope="row">{id + 1}</th>
                                            <td>{element.name}</td>
                                            <td>{element.email}</td>
                                            <td>{element.work}</td>
                                            <td>{element.mobile}</td>
                                            <td className='d-flex justify-content-between'>
                                                <button onClick={getData} className='btn btn-success'><Link to={`view/${element._id}`}><RemoveRedEyeIcon /></Link></button>
                                                <button className='btn btn-primary'><Link to={`edit/${element._id}`}><DeleteOutlineIcon /></Link></button>
                                                <button className='btn btn-danger'><EditIcon /></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>
            <Outlet />
        </div>
        </>
    )
}

export default Home