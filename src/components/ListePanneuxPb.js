import React, { Component } from 'react';
import configfire from '../providers/configfire'
import Loader from 'react-loader-spinner'
import { withRouter } from "react-router";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;


class ListePanneauxPub extends Component {
    constructor(props,context) {
        super(props,context);
           
        this.state = {
            ListePanneauxPub: {},
            showModal: false,
            div:'',
        }
       this.handleDelete = this.handleDelete.bind(this)
       this.handleClose = this.handleClose.bind(this)
    }
    componentDidMount() {
        
       
    }
    componentWillMount(){
        console.log("listepanneau");
        /* Create reference to messages in Firebase Database */
        let Ref = configfire.database().ref('Panneaux');
        console.log("listepanneau",Ref.toString());
        Ref.on('child_added', snapshot => {
            this.state.ListePanneauxPub[snapshot.key] = snapshot.val()
            console.log("listepanneau",snapshot )
            this.setState({
                ListePanneauxPub: this.state.ListePanneauxPub
            },() => {
                
            })
          /* Update React state when message is added at Firebase Database */
          
        },error => {
            console.log("error",error)
        })
    }

      componentDidUpdate(prevProps,prevState) {
        //   this.handleDelete()
        console.log("prevState",prevState.ListePanneauxPub)
        console.log("ListePanneauxPub",this.state.ListePanneauxPub)
        // if(JSON.stringify(this.state.ListePanneauxPub) != JSON.stringify(prevState.ListePanneauxPub)){
        //     console.log("prevProps",prevState.ListePanneauxPub)
        //     this.setState({
        //         ListePanneauxPub: prevState.ListePanneauxPub
        //     }) 
        // }
        
    }
     

      handleEdit(key,panneau) {
         const { history } = this.props;
          console.log("value",panneau)
          history.push('/panneau/edit',{panneau,key})
      }

      handleDelete(key) {
        let Ref = configfire.database().ref('Panneaux');
        console.log("listepanneau",Ref.toString());
        Ref.child(key).remove()
      }

      handleClose() {
        this.setState({
            showModal: false
        })
      }
     
    render() {
        if(Object.keys(this.state.ListePanneauxPub).length > 0) {
            return (
                
                <div className = "container">
                    {this.state.div}
                   <div className = "alert alert-dark">
                        <h4>Liste des Panneaux publicitaire</h4>
                   </div>
                    <table className = "table">
                        <thead className = "thead-dark">
                            <tr>
                                <th>Nom</th>
                                <th>Adresse</th>
                                <th>Status</th>
                                <th>Editer</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.keys(this.state.ListePanneauxPub).map((key) =>
                        <tr key = {key}>
                            <td >{this.state.ListePanneauxPub[key].nom}</td>
                            <td >{this.state.ListePanneauxPub[key].adresse}</td>
                            <td >{this.state.ListePanneauxPub[key].status}</td>
                            <td><button className = "btn btn-light" onClick = {() => this.handleEdit(key,this.state.ListePanneauxPub[key])} data-toggle="modal" data-target="#exampleModal"><i className = "fas fa-pencil-alt"></i></button></td>
                            <td><span style = {{color:'red',cursor:'pointer',paddingLeft:50}} onClick = {() => this.handleDelete(key)}><i className = "fas fa-trash"></i></span></td>
                        </tr> 
                    )}
                        </tbody>
                    </table>
                </div>
            )
        }
        if (this.state.ListePanneauxPub == undefined) {
            return (
                <div>hello</div>
            )
        }
        return <div className = "d-flex justify-content-center"> 
                    <div className = "" style = {{marginTop:200}}>
                        <h4 style = {{color:'#777'}}>Veillez patienter que la liste des panneaux publicitaire ce charge</h4>
                        <div style = {{textAlign:'center'}}>
                        <Loader 
                        type="Ball-Triangle"
                        color="#00BFFF"
                        height="50"	
                        width="50"/></div>
                    </div>
                </div>
            
    }
}

const ListePanneaux = withRouter(ListePanneauxPub);
export default ListePanneaux;
