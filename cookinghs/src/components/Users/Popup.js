import React, { Component } from "react";
import {Modal, Box, Button, TextField} from '@mui/material';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
import styles from './Popup.css';
import axios from 'axios'; // new!!
import {Label, Input} from 'reactstrap'
const {SHA256} = require('crypto-js');

const boxMode = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    minHeight: 500,
    bgcolor: 'background.paper',
    borderRadius: 1,
    // border: '1px solid #000',
    boxShadow: 24,
    p:4,
}
const buttonMode = {
    height: '56px',
    marginLeft: '5px'
}
export default class Popup extends Component {
    componentDidMount(){
        console.log("popup!!!")
    }
    state = {
        username : this.props.currentUser.username,
        fullName : this.props.currentUser.fullName,
        email : this.props.currentUser.email,
        picture : this.props.currentUser.profilePic,
        password : "",
        failText : "",
        succText : ""
    }
    click = () => {
        this.props.toggle();
    };
    recieve = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => console.log(value))
    }
    update = event => {
        const target = event.target;
        const name = target.name;
        if(name === "password" && (this.state.password === "")){
            this.setState({
                failText : "Invalid Password"
            })
        }
        if(name === "email" && (this.state.email === "")){
            this.setState({
                failText : "Invalid Email"
            })
        }
        if(name === "username" && (this.state.username === "")){
            this.setState({
                failText : "Invalid Username"
            })
        }
        if(name === "fullName" && (this.state.fullName === "")){
            this.setState({
                failText : "Invalid Name"
            })
        }
        if(name !== "password"){
            axios.patch("http://localhost:5000/api/users/" + this.props.currentUser._id, null, {params :{
                [name] : this.state[name]
            }}).then(async (response) => {
                this.setState({
                    succText : "Successfully Updated!",
                    failText : ""
                })
                console.log(response)
                axios.patch("http://localhost:5000/api/users/session/update", null, {params : {
                    [name] : this.state[name]
                }})
            }).catch((error) => {
                this.setState({
                    failText : "Username in use!"
                })
            })
        }else{
            axios.patch("http://localhost:5000/api/users/" + this.state.currentUser._id, null, {params :{
                passHash : SHA256(this.state.password).toString()
            }}).then(async (response) => {
                this.setState({
                    succText : "Password Updated!",
                    failText : ""
                })
            }).catch((error) => {
                this.setState({
                    failText : "An error occured!"
                })
            })
        }
    }

    handleImageChange = e => {
        const target = e.target;
        const file = target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            axios.patch('http://localhost:5000/api/users/image/' + this.props.currentUser._id, {imagefile: reader.result})
            .then( async (result) => {
                this.setState({
                    picture : result
                })
            }).catch((error) => {
                this.setState({
                    failText : "Image invalid/too large",
                    succText : ""
                })
            })
        }
    }
    render() {
        return (
            <Modal
            open={true}
            onClose={this.click.bind(this)}
            >
                <Box sx={boxMode}>
                    <h1>Edit Profile</h1>
                    <br/>
                    <TextField  label="Username" name="username" value={this.state.username} onInput={this.recieve.bind(this)}></TextField>
                    <Button variant="contained" name="username" style={buttonMode} onClick={this.update.bind(this)}>Update</Button>
                    <br/>
                    <br/>
                    <TextField  label="Full Name" name="fullName" value={this.state.fullName} onInput={this.recieve.bind(this)}></TextField>
                    <Button variant="contained" name="fullName" style={buttonMode} onClick={this.update.bind(this)}>Update</Button>
                    <br/>
                    <br/>
                    <TextField  label="Email" name="email" value={this.state.email} onInput={this.recieve.bind(this)}></TextField>
                    <Button variant="contained" name="email" style={buttonMode} onClick={this.update.bind(this)}>Update</Button>
                    <br/>
                    <br/>
                    <TextField  label="Password" name="password" value={this.state.password} onInput={this.recieve.bind(this)} type="password"></TextField>
                    <Button variant="contained" name="password" style={buttonMode} onClick={this.update.bind(this)}>Update</Button>
                    <h2 id="failText">{this.state.failText}</h2>
                    <h2 id="succText">{this.state.succText}</h2>

                    Profile Picture:
                    <br/>
                    <Button type="button" style={{padding: "2px", width: "fit-content"}}>
                            <Label
                            for="image"
                            style={{cursor: "pointer", height:"60px", width:"60px", marginBottom:"6px", borderRadius: "50%"}}
                            >
                            <img src={this.state.picture}
                                alt=''
                                id='uploadImage'
                            />
                            </Label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                style={{display: 'none'}}
                                onChange={this.handleImageChange.bind(this)}
                            />
                        </Button>
                        <br/>
                        <br/>
                    <Button variant="contained" onClick={this.click.bind(this)}>Exit</Button>
                </Box>
            </Modal>
        );
    }
}