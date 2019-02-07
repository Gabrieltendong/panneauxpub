import React, { Component } from 'react';
import configfire from '../providers/configfire'
import firebase from 'firebase';
import Notifications, {notify} from 'react-notify-toast';

class CreatePub extends Component {
    constructor() {
        super();
        this.state = {
            show:false,
            pubs:{}
        }

        this.handleshow = this.handleshow.bind(this)
    }

    addPub(event) {
        event.preventDefault();
        const storageService = firebase.storage();
        const storageRef = storageService.ref();
        let Ref = configfire.database().ref('Publicites');
        if(this.state.pubs.image) {
            var uploadTask = storageRef.child(`Publicites/${this.state.pubs.image.name}`).put(this.state.pubs.image);
        
        uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
                console.log("snapshot",snapshot)
            }, (error) => {
              // Handle unsuccessful uploads
              console.log("error",error);
            }, () => {
               // Do something once upload is complete
               console.log('success');
               uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                this.state.pubs['image'] = downloadURL
                    Ref.push(this.state.pubs);
                    notify.show('Votre Pub a été enregistré!','success');
                console.log("Panneau",this.state.pubs)
              });
              
            })
    }
}

    handleChange(event) {
        if(event.target.files) {
            console.log("event.target.files",event.target.files[0])
            this.state.pubs[event.target.name] = event.target.files[0]
            this.setState({
                pubs: this.state.pubs
            })
        }else {
            this.state.pubs[event.target.name] = event.target.value
             this.setState({
                pubs: this.state.pubs
        })
        } 
        
        console.log("valurinput",this.state.pubs)
    }

    handleshow(event) {
        event.preventDefault()
        this.setState({
            show: true
        })
    }
    
    render() {
        return (
            <div>
               <Notifications />
                <input onChange = {this.handleChange.bind(this)} name = "nom" className = "form-control ml-2" type = "text" placeholder = "Nom"/> 
                <div className = "input-group ml-2 mt-4">
                    <div className = "input-group-prepend">
                        <span className = "input-group-text" id="inputGroupFileAddon01">Upload</span>
                    </div>
                    <div className = "custom-file">
                        <input type="file" onChange = {this.handleChange.bind(this)} accept="image/*" name = "image" className = "custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                        <label className = "custom-file-label" for="inputGroupFile01">Choisir le fichier</label>
                    </div>
                </div>
                <button onClick ={this.addPub.bind(this)} className = "btn btn-dark mt-3 ml-2">Valider</button>
                   
            </div>
        )
    }
}

export default CreatePub;