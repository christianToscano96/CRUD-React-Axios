import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './Header';
import Navegacion from './Navegacion';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Formulario from './Formulario';
import Editar from './Editar';





class Rauter extends Component {
    state = {
        posts : []

      }

      componentDidMount() {
          this.obtenerPost();
      }                         

      
      //metodo
        obtenerPost = () => {
            //haremos uso de axios
            axios.get(`https://jsonplaceholder.typicode.com/posts`)
                .then(res => {
                this.setState({
                    posts: res.data 
                })
            })
      }

      borrarPost = (id) => {
         axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
         .then(res=> {
             if(res.status === 200) {
                 const posts = [...this.state.posts];
               
                 let resultado = posts.filter(post => (
                     post.id !== id
                 ));
                 this.setState({
                     posts : resultado
                 })
             }
         })
      }

      crearPost = (postNuevo) => {
          axios.post(`https://jsonplaceholder.typicode.com/posts`, {postNuevo})
            .then(res => {
               if(res.status === 201){
                    Swal(
                        'Post Created!',
                        'was created correctly!',
                        'success'
                    )
                    let postId = {id: res.data.id};
                    const newPost = Object.assign({}, res.data.postNuevo, postId);
                    
                    this.setState(prevState => ({
                        posts: [...prevState.posts, newPost]
                    }))
               }
               
            })
      }

      editarPost = (postActualizado) => {

        const {id} = postActualizado;
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {postActualizado})
        .then(res => {
           if(res.status === 200) {
            Swal(
                'Good job!',
                'Change made!',
                'success'
              )
               let postId = res.data.id;

               const posts = [...this.state.posts];

               //para indentificar e igualar el id que esta en el state
               const postEditar = posts.findIndex(post => postId === post.id);

               posts[postEditar] = postActualizado;
              
               this.setState({
                   posts
               })
           }
        })

      }


    render() { 
        return ( 
            <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header />
                        <Navegacion />

                        <Switch>
                            <Route exact path="/" render={ () => {
                                return(
                                    <Posts
                                        posts = {this.state.posts}
                                        borrarPost = {this.borrarPost}                                      
                                    />
                                )
                            }}
                            />

                            <Route exact path="/post/:postId" render={ (props) => {

                                let idPost = props.location.pathname.replace('/post/', '');

                                const posts = this.state.posts;

                                let filtro;

                                filtro = posts.filter(post => (
                                    post.id === Number(idPost)
                                ))
                                return(
                                    <SinglePost
                                        post={filtro[0]}
                                    />
                                )    
                            } }
                            />  
                            
                            <Route exact path="/crear" render={ () => {
                                return(
                                    <Formulario
                                        
                                        crearPost = {this.crearPost}                                      
                                    />
                                )
                            }} 
                            />
                            <Route exact path="/editar/:postId" render={ (props) => {

                                let idPost = props.location.pathname.replace('/editar/', '');

                                const posts = this.state.posts;

                                let filtro;

                                filtro = posts.filter(post => (
                                    post.id === Number(idPost)
                                ))
                                return(
                                    <Editar
                                        post={filtro[0]}
                                        editarPost={this.editarPost}
                                    />
                                )    
                            } }
                            />
                            
                        </Switch>
                    </div>
                </div>
            
            </BrowserRouter>

         );
    }
}
 
export default Rauter;