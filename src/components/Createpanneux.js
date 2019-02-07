import React, { Component } from 'react';
import configfire from '../providers/configfire'
import firebase from 'firebase';
import CreatePub from './Createpub'
import 'bootstrap/dist/css/bootstrap.css'


class CreatePanneaux extends Component {
    constructor() {
        super();
        this.state = {
            pubs:{},
            panneau:{
               
            },
            imageUrl:""
        }
        
    }

    componentWillMount(){
        console.log("listepanneau");
        /* Create reference to messages in Firebase Database */
        let Ref = configfire.database().ref('Publicites');
        console.log("listePublicites",Ref.toString());
        Ref.on('child_added', snapshot => {
            this.state.pubs[snapshot.key] = snapshot.val()
            console.log("listePublicites",snapshot )
            this.setState({
                pubs: this.state.pubs
            },() => {
                console.log("listePublicites",this.state.pubs) 
            })
          /* Update React state when message is added at Firebase Database */
          
        },error => {
            console.log("error",error)
        })
       
      }

    handleChange(event) {
        if(event.target.files) {
            console.log("event",event.target.files[0].name)
            this.state.panneau[event.target.name] = event.target.files[0]
            this.setState({
                panneau: this.state.panneau
            })
        }else {
            console.log("event",event)
            this.state.panneau[event.target.name] = event.target.value
             this.setState({
            panneau: this.state.panneau
        })
        } 
        
        console.log("valurinput",this.state.panneau)
    }

    addPanneau(event) {
        event.preventDefault();
        const storageService = firebase.storage();
        const storageRef = storageService.ref();
        let Ref = configfire.database().ref('Panneaux');
        if(this.state.panneau.image) {
            var uploadTask = storageRef.child(`Panneaux/${this.state.panneau.image.name}`).put(this.state.panneau.image);
        
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
                this.state.panneau['image'] = downloadURL
                    Ref.push(this.state.panneau);
                console.log("Panneau",this.state.panneau)
              });
              
            })
        }
        
        
        Ref.push(this.state.panneau);
        // let Ref = configfire.database().ref('Panneaux');
        // Ref.put(this.state.panneau);
        // window.location.reload()
    }
    render() {
        return (
            <div className = "container">
                <div className = "card">
                    <div className = "card-header bg-dark">
                        Create Panneau
                    </div>
                    <div className = "card-body p-4">
                        <form onSubmit ={this.addPanneau.bind(this)} >
                            <div className = "form-group">
                                <label  className = "ml-2">Nom</label>
                                <input onChange = {this.handleChange.bind(this)} name = "nom" className = "form-control m-2" type = "text" placeholder = "Nom du panneau"/>
                            </div>
                            <div>
                                <label  className = "ml-2">Adresse</label>  
                                <input onChange = {this.handleChange.bind(this)} name = "adresse" className = "form-control m-2" type = "text" placeholder = "Adresse du panneau"/>
                            </div>
                            <div>
                                <label  className = "ml-2">Status </label>
                                <select onChange = {this.handleChange.bind(this)} name = "status" className = "form-control m-2">
                                    <option>Status</option>
                                    <option value = "allumé">Allumé</option>
                                    <option value = "eteind">Eteind</option>
                                </select>
                            </div> 
                            <div>
                                {this.state.panneau.status == "allumé"?
                                    <div>
                                        {Object.keys(this.state.pubs).length > 0?
                                    <div>
                                        <p>Image</p>
                                        <div>
                                        <select onChange = {(e) => this.handleChange(e)} name = "publicité" className = "form-control">
                                                    <option selected>Selectionnez votre pub</option>
                                            {Object.keys(this.state.pubs).map((key) =>
                                                    <option key = {key} value = {key}>{this.state.pubs[key].nom}</option>
                                               
                                            )}
                                             </select> 
                                        </div>   
                                    </div>:<form><fieldset>
                                                    <legend>Ajouetr une pub</legend>
                                                    <CreatePub />
                                                    </fieldset>
                                            </form>}
                                    </div>:null
                                }
                            </div>
                            <button className = "btn btn-success ml-2 mt-3" type = "submit">Créer</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePanneaux;