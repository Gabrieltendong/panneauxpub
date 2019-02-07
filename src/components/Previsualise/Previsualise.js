import React, { Component } from 'react';
import configfire from '../../providers/configfire'
import Loader from 'react-loader-spinner'
import './previsualise.css';

class Previsualises extends Component {
    constructor() {
        super();
        this.state = {
            ListePanneauxPub: {}
        }
    }

    componentWillMount(){
        console.log("listepanneau");
        /* Create reference to messages in Firebase Database */
        let Ref = configfire.database().ref('Panneaux');
        let Refpub = configfire.database().ref('Publicites');
        Ref.on('child_added', snapshot => {
        if(snapshot.val().publicité) {
            this.state.ListePanneauxPub[snapshot.key] = snapshot.val()
            console.log("listepanneau",snapshot.val().publicité)
            Refpub.child(snapshot.val().publicité).once("value", pub => {
                console.log("pubs",pub.val())
                this.state.ListePanneauxPub[snapshot.key].publicité = pub.val()
                this.setState({
                    ListePanneauxPub: this.state.ListePanneauxPub
                })
            })
            // this.setState({
            //     ListePanneauxPub: this.state.ListePanneauxPub
            // })
            console.log("listepanneau",this.state.ListePanneauxPub);
          /* Update React state when message is added at Firebase Database */
        }  
        },error => {
            console.log("error",error)
        })
       
      }

    render() {
        return(
            <div className = "container">
                {Object.keys(this.state.ListePanneauxPub).length > 0?<div className = "row">
                    {Object.keys(this.state.ListePanneauxPub).map((key) => 
                        <div className = "col-3" key = {key}><div className = "card mt-4">
                            <img className = "card_img card-img-top" src = {this.state.ListePanneauxPub[key].publicité.image}/>
                            <div className = "card-body">
                                <h5 className = "card-title">{this.state.ListePanneauxPub[key].nom}</h5>
                                <a href="#" className = "btn btn-primary">Go somewhere</a>
                            </div>
                        </div></div>
                    )}
                </div>:<div className = "d-flex justify-content-center"> 
                    <div className = "" style = {{marginTop:200}}>
                        <h4 style = {{color:'#777'}}>Veillez patienter que la liste des panneaux publicitaire ce charge</h4>
                        <div style = {{textAlign:'center'}}>
                        <Loader 
                        type="Ball-Triangle"
                        color="#00BFFF"
                        height="50"	
                        width="50"/></div>
                    </div>
                </div>}
                
            </div>
        )
    }
}

export default Previsualises