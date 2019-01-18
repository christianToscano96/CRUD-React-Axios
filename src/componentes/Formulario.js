import React, { Component } from 'react';

class Formulario extends Component {

    //crar los refs
    tituloRef = React.createRef();
    entradaRef = React.createRef();

    crearPost= (e) => {
        e.preventDefault();

        //leer los post
        const postNuevo = {
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId: 1
        }
        

        //eviar los props o peticion de axios
        this.props.crearPost(postNuevo);
    }


   
    render() { 
        return ( 
            <form onSubmit={this.crearPost} className="col-8">
                <legend className="text-center">Crear un Nuevo Post</legend>
                <div className="form-group">
                    <label>Titulo de Post:</label>
                    <input  type="text" className="form-control" ref={this.tituloRef} placeholder="Titulo del Post" />
                </div>
                <div className="form-group">
                    <label>Contenido:</label>
                    <textarea className="form-control"  ref={this.entradaRef} placeholder="Conenido...."></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            
            </form>
         );
    }
}
 
export default Formulario;