import React, { useState, useHistory } from 'react'


// import { NavLink } from 'react-router-dom'
const Register = () => {


    const history = useHistory("");

    const [inputValue, setInput] = useState({
        name:"",
        email:"",
        age:"",
        mobile:"",
        work:"",
        address:"",
        description:""
    });
    const setdata = (e) =>{
        console.log(e.target.value)
        const {name, value} = e.target;
        setInput((preval) => {
            return{
                ...preval,
                [name]:value
            }
        })
    }

    // fallign function when submit button click
    const addData = async(e) => {
        e.preventDefault();

        const {name, email, age, mobile, work, address, description} = inputValue;

        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            // convert our json data to object data
            body: JSON.stringify({
                name,email,age,mobile,work,address,description
            })
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            alert("Please fill the data");
            console.log("error");
        }
        else{
            alert("Data added successfully");
            history.push("/");
            console.log("data added successfully");
        }
    }



    return (
        <div className='container'>
            <form className="mt-2">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" value={inputValue.name} onChange={setdata} name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email"  value={inputValue.email} onChange={setdata} name='email' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Age</label>
                        <input type="text" value={inputValue.age} onChange={setdata} name='age' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Mobile</label>
                        <input type="text" value={inputValue.mobile} onChange={setdata} name='mobile' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Work</label>
                        <input type="text" value={inputValue.work} onChange={setdata} name='work' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" value={inputValue.address} onChange={setdata} name='address' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Description</label>
                        <textarea  value={inputValue.description} onChange={setdata} name='description' className="form-control" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button type="submit" onClick={addData} name='submit' className="btn btn-primary w-25 align-middle">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register