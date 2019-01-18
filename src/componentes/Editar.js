import React, { Component } from 'react';

class Editar extends Component {

    //crar los refs
    tituloRef = React.createRef();
    entradaRef = React.createRef();

    editarPost= (e) => {
        e.preventDefault();

        //leer los post
        const postNuevo = {
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId: 1,
            id: this.props.post.id
        }
        

        //eviar los props o peticion de axios
        this.props.editarPost(postNuevo);
    }


   
    
       

        cargarFormulario = () => {
            if(!this.props.post) return null;

            const {title, body} = this.props.post;

            return(
                <form onSubmit={this.editarPost} className="col-8">
                    <legend className="text-center">Editar Post</legend>
                    <div className="form-group">
                        <label>Titulo de Post:</label>
                        <input  type="text" className="form-control" ref={this.tituloRef} defaultValue={title} />
                    </div>
                    <div className="form-group">
                        <label>Contenido:</label>
                        <textarea className="form-control"  ref={this.entradaRef} defaultValue={body}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                </form>
            )
        }

        render() { 

        
        return ( 
            <React.Fragment>
                {this.cargarFormulario() }
            </React.Fragment>
         );
    }
}

 
export default Editar;