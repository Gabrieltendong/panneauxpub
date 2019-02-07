import React, { Component } from 'react';
import configfire from '../providers/configfire'
import firebase from 'firebase';
import CreatePub from './Createpub'
import  Loader  from 'react-loader-spinner'
import './Previsualise/previsualise.css'
import Notifications, {notify} from 'react-notify-toast';
import {ProgressBar} from 'react-bootstrap'

class Publicites extends Component {
    constructor() {
        super();
        this.state = {
            show:false,
            showbtn:false,
            pubs:{},
            newpub:{},
            count:0
        }

        this.handleshow = this.handleshow.bind(this)
    }

    componentWillMount() {
        let Ref = configfire.database().ref('Publicites');
        console.log("listepubs",Ref.toString());
        Ref.on('child_added', snapshot => {
            this.state.pubs[snapshot.key] = snapshot.val()
            console.log("listepubs",snapshot )
            this.setState({
                pubs: this.state.pubs
            },() => {
                console.log("listepubs",this.state.pubs);
            })
          /* Update React state when message is added at Firebase Database */
          
        },error => {
            console.log("error",error)
        })
    }

    handleDelete(event,key) {
        let storageService = firebase.storage();
        let Ref = configfire.database().ref('Panneaux');
        let Refpub = configfire.database().ref('Publicites');
        console.log("event",Ref)
        Ref.child("publicité").child(key).remove()
        Ref.on('child_added', snapshot => {
            if(snapshot.val().publicité == key) {
                Ref.child(snapshot.key).child("publicité").remove().then((success) => {
                    console.log("success",success)
                },(error) => {
                    console.log("error",error)
                })
                Refpub.child(key).remove()
                console.log("Ref.child", snapshot.key)
                console.log("storageService.refFromURL",storageService.refFromURL(this.state.pubs[key].image))
                storageService.refFromURL(this.state.pubs[key].image).delete()
            }else {
                // Refpub.child(key).remove()
            }
          /* Update React state when message is added at Firebase Database */
          
        },error => {
            console.log("error",error)
        })
        // Refpub.child(key).remove().then((value => {
            
        // },(error) => {

        // }))
    }

    handleEdit(e) {
        this.refs.fileUploader.click();
    }

    handleshow(event) {
        event.preventDefault()
        this.setState({
            show: true
        })
    }

    handleSave(event,key) {
        event.preventDefault()
        console.log("success",key);
        let storageService = firebase.storage();
        let Ref = configfire.database().ref('Panneaux');
        let Refpub = configfire.database().ref('Publicites');
        let upload = storageService.refFromURL(this.state.pubs[key].image).put(this.state.newpub.image)
        upload.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
                console.log("snapshot",snapshot)
                this.setState({
                    count:this.state.count + 1
                },() => {
                    console.log("count",this.state.count)
                })
            }, (error) => {
              // Handle unsuccessful uploads
              console.log("error",error);
            }, () => {
               // Do something once upload is complete
               console.log('success');
            //    upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
            //     console.log('File available at', downloadURL);
            //     this.state.pubs[key].image = downloadURL
            //         Ref.push(this.state.pubs);
            notify.show('Modification effectué avec success!','success');
            this.setState({
                count:0
            },() => {
                console.log("count",this.state.count)
            })

                console.log("Panneau",this.state.pubs)
            //   });
              
            })
    }

    handleChange(event,key) {
        event.preventDefault()
        console.log("file",event.target.files[0])
        this.state.newpub[event.target.name] = event.target.files[0]
        this.setState({
            newpub: this.state.newpub,
            showbtn: true
        })
        console.log("this.state.pubs",this.state.newpub)
    }
    
    render() {
        return (
            <div>
                <div>
                    <Notifications />
                   {this.state.count > 0?<ProgressBar animated now={this.state.count} />:null}
                    {Object.keys(this.state.pubs).length > 0?
                       <div>
                           <div>
                                <button type = "submit" style = {{backgroundColor:'#30336b',color:'white'}} className = "btn" onClick = {this.handleshow}><i className = "fas fa-plus"></i> Ajouter une pub</button>
                           </div>
                           <div className = "row">
                                {Object.keys(this.state.pubs).map((key) =>
                                    <div className = "col-3">
                                        <div className = "card mt-3" style = {{boxShadow:'1px 0 10px rgba(0,0,0,0.2)'}}>
                                        {this.state.showbtn?<button className  = "btn"  onClick = {(e) => this.handleSave(e,key)}>Save</button>:null}
                                        <img className = "card_img" src = {this.state.pubs[key].image} />
                                        <div className = "card-body">
                                            <h5 className = "card-title">{this.state.pubs[key].nom}</h5>
                                        </div>
                                        <div className = "card-footer">
                                            <i onClick = {(e) => this.handleEdit(e,key)} className = "fas fa-pencil-alt m-2" style = {{cursor:'pointer'}}>
                                                <input onChange = {(e) => this.handleChange(e,key)} accept="image/*" type="file" id="file" name = "image" ref="fileUploader" style={{display: "none"}} webkitdirectory = {true} mozdirectory = {true} directory = {true}/>
                                            </i>
                                            <i onClick = {(e) => this.handleDelete(e,key)} className = "fas fa-trash m-2" style = {{cursor:'pointer'}}></i>
                                        </div>
                                    </div> 
                                    </div>
                                )}
                            </div>
                       </div>:<div className = "d-flex justify-content-center"> 
                        <div className = "" style = {{marginTop:200}}>
                            <h4 style = {{color:'#777'}}>Veillez patienter que la liste des publicités ce charge</h4>
                            <div style = {{textAlign:'center'}}>
                            <Loader 
                            type="Ball-Triangle"
                            color="#00BFFF"
                            height="50"	
                            width="50"/></div>
                        </div>
                    </div>
                    }
                </div>
                <div>
                    {this.state.show?
                        <form >
                          <CreatePub />
                        </form>:null}
                </div>
            </div>
        )
    }
}

export default Publicites;