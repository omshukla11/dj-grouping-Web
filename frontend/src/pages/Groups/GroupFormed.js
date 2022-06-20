import { Button, Card, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import './GroupFormed.scss'
import { GroupFormedAction } from "../../REDUX/Actions/GroupFormedAction"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
var axios = require('axios');
var FormData = require('form-data');

const GroupFormed = () => {
    const [grpdata, setData] = useState([]);
    
    let req;
    // const dispatch = useDispatch();
    // const GroupFormed = useSelector((state) => state.GroupFormed);
    // const { loading, error, GroupFormedData } = GroupFormed;
    
    // console.log(typeof(GroupFormedData));
    useEffect(() => {
        axios.get(`http://omshukla.pythonanywhere.com/dashboard/alluserreq/${localStorage.getItem("userProf_id")}/`)
            .then(res => {
                console.log(res.data)
                req = (res.data)
                req.map(r => {
                    axios.get(`http://omshukla.pythonanywhere.com/dashboard/group/${r.group}/`)
                        .then(res2 => {
                            setData([...grpdata, res2.data])
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [req]);
    console.log(grpdata);

    var user_id = localStorage.getItem("userProf_id");
    const groupAR = (ans, g) => {
        var data = new FormData();
        data.append('join', ans);
        data.append('user', user_id);
        data.append('group', g);
        var config = {
            method: 'post',
            url: 'http://omshukla.pythonanywhere.com/dashboard/groupreq/',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <h1 className='groupHeading'>Groups Formed</h1>

            <Grid spacing={{ xs: 2, md: 3 }} container className='GroupMain'>
                {grpdata.map((x) => {
                        return <Grid item key={x.group_id} xs={12} sm={6} md={3} className='innerGroupGrid'>
                            <Card >
                                <center>
                                    <img width='100' height='100' src={`http://omshukla.pythonanywhere.com/${x.group_picture}`} alt='random'></img>
                                </center>
                            </Card>
                            <h2>{x.group_name} ({x.group_members})</h2>
                            <p>{x.group_desc}</p>
                            <Button variant='contained' color='success' className='groupButton' onClick={() => groupAR(true, x.group_id)}>Join</Button>
                            <br />
                            <Button variant='contained' color='error' className='groupButton' onClick={() => groupAR(false, x.group_id)}>Decline</Button>
                        </Grid>
                    })}
            </Grid>
        </div>
    )
}

export default GroupFormed