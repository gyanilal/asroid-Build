import React, { Component, useEffect, useState } from 'react';
import { TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import axios from "axios";
import {API_KEY} from "../../share";
import { makeStyles } from '@material-ui/core/styles';
// import classes from '*.module.css';
const useStyles = makeStyles({
    root:{
        textAlign:"center",
        margin:"20%",
    },
    head:{
        fontSize:"20px",
        color:"#000000",
        marginBottom:"30px",
        borderBottom:"solid 1px #3333333"
    },
    attr:{
        fontSize:"28px",
        fontWeight:"bold",
        textAlign:"left"
    },
    back:{
        display:"block",
        marginBottom:"10px"
    }

})
export default function AstroidDetail(props){
    const [loading, setloading] = useState(true)
    console.log(props.location)
    useEffect(()=>{
        if(props.location.astroid_data){
            setloading(false);
        }
    })
    const data = props.location ? props.location.astroid_data : {};
    const handleback = ()=>{
        props.history.push({
            pathname:"/"
        })
    }
    const classes = useStyles();
    return(
        <div className={classes.root}>
            {loading ? <CircularProgress />:
                <div>
                    <Button className={classes.back} onClick={handleback}>
                        back
                    </Button>
                    <div className={classes.head}>Astroid information Center</div>
                    <Typography className={classes.attr} component="span">Name:</Typography>
                    <Typography>{data.name}</Typography>
                    <br></br>
                    <Typography className={classes.attr} component="span">nasa_jpl_url:</Typography>
                    <Typography>{data.url}</Typography>
                    <br></br>
                    <Typography className={classes.attr} component="span">is_potentially_hazardous_asteroid:</Typography>
                    <Typography>{data.is_hazardious ? "YES":"NO"}</Typography>
                </div>
            }
        </div>
    )
}