import React, {Component} from 'react' 
import { Link,Route } from 'react-router-dom';
import ListePanneaux from './components/ListePanneuxPb'
import CreatePanneaux from './components/Createpanneux'
import Edit from './components/EditPanneau'
import Publicites from './components/Publicites';
import Previsualises from './components/Previsualise/Previsualise'

class Router extends Component {
    constructor() {
        super();
        this.state = {
            showpan: false,
            showpub: false
        }
        this.handleshowpan = this.handleshowpan.bind(this)
        this.handleshowpub = this.handleshowpub.bind(this)
    }

    handleshowpan(event) {
        event.preventDefault()
        this.setState({
            showpan: !this.state.showpan
        })
    }

    handleshowpub(event) {
        event.preventDefault()
        this.setState({
            showpub: !this.state.showpub
        })
    }

    render() {
        return (
            <div>
                <div class="">
                    <div class="row">
                        <div class="col-3 col-sm-3 col-md-9 col-lg-2 col-xl-2 d-flex align-items-start p-0" >
                            <nav className = "navbar navbar-dark navbar-toggleable-sm bg-dark d-flex align-items-start pr-0 position-fixed" style = {{height:'100vh'}} >
                                <div className = "container">
                                        <div style = {{width: '100%'}}>
                                            <Link className="navbar-brand mb-5 mt-4" style = {{border:'1px solid white',padding:'5px',borderRadius:'50%'}} to = "/">GPP</Link>
                                        </div>
                                        
                                        <div>
                                            <ul className = "navbar-nav mr-auto ">
                                                <li className = "nav-item" onClick = {this.handleshowpan}>
                                                    <Link className = "nav-link" to = "/"  >Panneaux {this.state.showpan?<i className = "fas fa-angle-down mt-1" style = {{position:'absolute',right:'30px'}}></i>:<i className = "fas fa-angle-right mt-1" style = {{position:'absolute',right:'30px'}}></i>} 
                                                        {this.state.showpan?
                                                        <div >
                                                            <li>
                                                                <Link className = "nav-link" to = "/">Liste</Link>
                                                            </li>
                                                            <li>
                                                                <Link className = "nav-link" to = "panneau/créer"><i className = "fas fa-plus"></i> Créer</Link>
                                                            </li>
                                                        </div>:null}
                                                    </Link>
                                                </li>
                                                <li className = "nav-item" onClick = {this.handleshowpub}>
                                                    <Link className = "nav-link" to = "/publicité" >Publicités {this.state.showpub?<i className = "fas fa-angle-down mt-1" style = {{position:'absolute',right:'30px'}}></i>:<i className = "fas fa-angle-right mt-1" style = {{position:'absolute',right:'30px'}}></i>}
                                                        {this.state.showpub?
                                                        <div >
                                                            <li>
                                                                <Link className = "nav-link" to = "/">Liste</Link>
                                                            </li>
                                                            <li>
                                                                <Link className = "nav-link" to = "panneau/créer"><i className = "fas fa-plus"></i> Créer</Link>
                                                            </li>
                                                        </div>:null}
                                                    </Link>
                                                </li>
                                                <li className = "nav-item">
                                                    <Link className = "nav-link" to = "/previsualisation" >Prévisualiser</Link>
                                                </li>
                                            </ul>
                                        </div>
                                </div>
                            </nav>
                        </div>
                        <div className="col-9 col-sm-9 col-md-9 col-lg-10 col-xl-10 mt-4 pl-2 pr-5 pb-3" >
                            <Route exact path = "/" component = {ListePanneaux}/>
                            <Route  path = "/publicité" component = {Publicites}/>
                            <Route  path = "/previsualisation" component = {Previsualises}/>
                            <Route  path = "/panneau/créer" component = {CreatePanneaux} />
                            <Route  path = "/panneau/edit" component = {Edit} />
                        </div>
                    </div>
                </div>
               
            </div>
        )
    }
}

export default Router;