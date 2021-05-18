import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from "axios";
import {API_KEY} from "../../share";
import { withStyles } from '@material-ui/core/styles';
// import classes from '*.module.css';

const styles = {
    root:{
        textAlign:"center",
        marginTop:"20%"
    },
    head:{
        fontSize:"20px",
        color:"#000000",
        marginBottom:"30px"
    },
    submit:{
        margin:"20px"
    }
}
class Astroid extends Component{
    state = {
        text:"",
        randomastroid:null,
        loading:false,
    }
    handleChange = (event) =>{
        this.setState({
            text: event.target.value
        })
    }
    handleClick = () =>{
        if(this.state.text.length > 0){
            const astroid_id = this.state.text;
            axios
                .get(
                    `https://api.nasa.gov/neo/rest/v1/neo/${astroid_id}?api_key=${API_KEY}`
                )
                .then((res)=>{
                    console.log(res)
                    const astroid_data = {
                        name: res.data.name,
                        url: res.data.nasa_jpl_url,
                        is_hazardious: res.data.is_potentially_hazardous_asteroid
                    }
                    this.props.history.push({
                        pathname:"/details",
                        astroid_data: astroid_data
                    })
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
    }
    handleRandom = () =>{
        
        this.setState({
            loading:true
        })
        axios
            .get(
                `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`
            )
            .then((res)=>{
                const random_no = parseInt(res.data.near_earth_objects.length * Math.random());
                const random_id = res.data.near_earth_objects[random_no].id;
                if( random_id){
                    axios
                    .get(
                        `https://api.nasa.gov/neo/rest/v1/neo/${random_id}?api_key=${API_KEY}`
                    )
                    .then((res)=>{
                        console.log(res)
                        const astroid_data = {
                            name: res.data.name,
                            url: res.data.nasa_jpl_url,
                            is_hazardious: res.data.is_potentially_hazardous_asteroid
                        }
                        this.props.history.push({
                            pathname:"/details",
                            astroid_data: astroid_data
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
                
            })
    }
    render(){
        const classes = this.props;
        return(
            <>
            <div className={classes.root}>
                <div className={classes.head}>Astroid Application</div>
                <TextField 
                    label="Enter Astroid Id"
                    helperText="Input Integers Only"
                    type="number"
                    onChange={this.handleChange}
                    />
                <br></br>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleClick}
                    className={
                        classes.submit
                    }
                    disabled={this.state.text.length > 0 ? false:true}
                    >Submit</Button>
                <br></br>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={
                        this.handleRandom
                    }
                    >Random Astroid</Button>
                    {this.state.loading ? "...Generating":""}
            </div>
            </>
        )
    }
    
}
export default withStyles(styles)(Astroid);