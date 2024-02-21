import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import '/src/App.css'
import {Link, Outlet, useParams, useHistory } from 'react-router-dom';


const Detail = () => {

    const {id} = useParams("");
    console.log(id);

    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata);

    const history = useHistory();


    const getData = async () => {

        const res = await fetch(`http://localhost:3000/getuser/${id}`, {
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
    };
    
    useEffect(() =>{
        getData();
    },[]);





    const deleteuser = async (id) => {

        const res2 = await fetch(`https://localhost:3000/deleteuser/${id}`, {
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
            history.push("/");
        }

    }



    return (
        <div className='container mt-4'>
            <h1>Welcome Piyush Malviya</h1>
            <Card sx={{ maxWidth: 700 }}>
                <CardContent className='detail_card mt-3'>
                <div className="add_btn_1 mb-2">
                        <button className='btn btn-danger  mx-2'><Link to={`/edit/${getuserdata._id}`}><EditIcon /></Link></button>
                        <button className='btn btn-primary' onClick={() => deleteuser(getuserdata._id)}><DeleteOutlineIcon /></button>
                            
                        </div>
                    <div className="leftside">
                        <img src="\images\youngman.png" style={{ width: 50 }} alt="profile" />
                        <h3>Name:- <span>{getuserdata.name}</span></h3>
                        <h3>Age:- <span>{getuserdata.age}</span></h3>
                        <p><MailOutlineIcon/>Email: <span>{getuserdata.email}</span></p>
                        <p><WorkIcon/>Occuption: <span>{getuserdata.work}</span></p>
                    </div>
                    <div className="rightside mt-5 pt-1">
                        <div className="add_btn_2 mb-2">
                        <button className='btn btn-danger  mx-2'><EditIcon /></button>
                        <button className='btn btn-primary'><DeleteOutlineIcon /></button>
                            
                        </div>
                        <p><LocalPhoneIcon/>Mobile:- <span>+91 {getuserdata.mobile}</span></p>
                        <p><FmdGoodIcon/>Location:- <span>{getuserdata.address}</span></p>
                        <p>Description:- <span>{getuserdata.description}</span></p>
                    </div>

                </CardContent>
            </Card>
            <Outlet/>
        </div>
    )
}

export default Detail