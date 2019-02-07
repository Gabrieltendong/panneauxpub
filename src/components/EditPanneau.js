import React, { Component } from 'react';
import configfire from '../providers/configfire'

class Edit extends Component {
    constructor(props) {
        super(props)

        console.log("props",this.props)

        this.state = {
            panneau: this.props.location.state.panneau,
            key:this.props.location.state.key
        }
    }

    handleChange(event) {
        this.state.panneau[event.target.name] = event.target.value
        this.setState({
            panneau: this.state.panneau
        })
        console.log("valurinput",this.state.panneau)
    }

    EditPanneau(event) {
        event.preventDefault()
        console.log("valurinput",this.state.panneau)
        let Ref = configfire.database().ref('Panneaux');
        Ref.child(this.state.key).update(this.state.panneau)
    }

    render() {
        return (
            <div>
               <form onSubmit ={this.EditPanneau.bind(this)} >
                    <div className = "form-group">
                        <label for="exampleInputEmail1" className = "ml-2">Nom</label>
                        <input onChange = {this.handleChange.bind(this)} value = {this.state.panneau.nom} name = "nom" className = "form-control m-2" type = "text" placeholder = "Nom du panneau"/>
                    </div>
                    <div>
                        <label for="exampleInputEmail1" className = "ml-2">Adresse</label>  
                        <input onChange = {this.handleChange.bind(this)} value = {this.state.panneau.adresse} name = "adresse" className = "form-control m-2" type = "text" placeholder = "Adresse du panneau"/>
                    </div>
                    <div>
                        <label for="exampleInputEmail1" className = "ml-2">Status </label>
                        <select onChange = {this.handleChange.bind(this)} name = "status" className = "form-control m-2">
                            <option>Status</option>
                            <option value = "allumé">Allumé</option>
                            <option value = "eteind">Eteind</option>
                        </select>
                    </div> 
                    
                    <button className = "btn btn-success ml-2 mt-3" type = "submit">Modifier</button>
                    </form> 
            </div>
        )
    }
}

export default Edit;