import React, { Component } from "react";
import {Modal, Box} from '@mui/material';
import axios from 'axios'; // new!!
import {Label, Input, Button} from 'reactstrap'
import { baseUrl } from '../../shared/baseUrl';
import styles from './Popup.css'
const {SHA256} = require('crypto-js');

//Material UI boxes don't work well with CSS, have to leave this here
const boxMode = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: "60%",
    minHeight: 500,
    bgcolor: '#FCFCF7',
    borderRadius: 1,
    // border: '1px solid #000',
    boxShadow: 24,
    p:4,
}
export default class Popup extends Component {
    componentDidMount(){
        console.log("popup")
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
            axios.patch(baseUrl + "api/users/" + this.props.currentUser._id, null, {params :{
                [name] : this.state[name]
            }}).then(async (response) => {
                this.setState({
                    succText : "Successfully Updated!",
                    failText : ""
                })
                axios.patch(baseUrl + "api/users/session/update", null, {params : {
                    [name] : this.state[name]
                }})
            }).catch((error) => {
                this.setState({
                    failText : "Username in use!"
                })
            })
        }else{
            axios.patch(baseUrl + "api/users/" + this.state.currentUser._id, null, {params :{
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
            axios.patch(baseUrl + 'api/users/image/' + this.props.currentUser._id, {imagefile: reader.result})
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
                    <div id="top">
                    </div>
                    <h1>Edit Profile</h1>
                    <br/>
                    <div id="buttonSpot">
                    <Button type="button" id="imgButt">
                            <Label
                            for="image"
                            >
                            <img src={this.state.picture}
                                alt=''
                                className='uploadImage'
                                id="img"
                            />
                            </Label>
                            {/* <img src={editPic} id="edit"/> */}
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                style={{display: 'none'}}
                                onChange={this.handleImageChange.bind(this)}
                            />
                        </Button>
                        </div>
                    <div class="grid-container">
                        <div class="grid-item">
                            <small id="lab">Username</small><br/>
                            <Input className="input" label="Username" name="username" value={this.state.username} onInput={this.recieve.bind(this)}></Input>
                            <Button variant="contained" name="username" onClick={this.update.bind(this)}>Update</Button>
                        </div>
                        <div id="fullName" class="grid-item">
                            <small id="lab">Full Name</small><br/>
                            <Input className="input" label="Full Name" name="fullName" value={this.state.fullName} onInput={this.recieve.bind(this)}></Input>
                            <Button variant="contained" name="fullName"  onClick={this.update.bind(this)}>Update</Button>
                        </div>
                        <div id="email" class="grid-item">
                        <small id="lab">Email</small><br/>
                            <Input className="input" label="Email" name="email" value={this.state.email} onInput={this.recieve.bind(this)}></Input>
                            <Button variant="contained" name="email"  onClick={this.update.bind(this)}>Update</Button>
                        </div>
                        <div id="password" class="grid-item">
                        <small id="lab">Password</small><br/>
                            <Input className="input" label="Password" name="password" value={this.state.password} onInput={this.recieve.bind(this)} type="password"></Input>
                            <Button variant="contained" name="password"  onClick={this.update.bind(this)}>Update</Button>
                        </div>
                    </div>
                    <h2 id="failText">{this.state.failText}</h2>
                    <h2 id="succText">{this.state.succText}</h2>
                        <br/>
                        <br/>
                    <Button variant="contained" onClick={this.click.bind(this)} id="exit">Exit</Button>
                </Box>
            </Modal>
        );
    }
}