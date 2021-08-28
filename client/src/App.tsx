import React from 'react'
import Home from './pages/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { CssBaseline } from '@material-ui/core';
import ApolloProvider from './config/Apollo';
import Post from './pages/Post';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';


interface AppProps {

}

const App: React.FC<AppProps> = () => {
  return(
    <Router>
      <ApolloProvider>
        <Layout>
          <Route path="/" exact component={Home} />
          <Route path="/create-post/" exact component={CreatePost} />
          <Route path="/update-post/:id" exact component={UpdatePost} />
          <Route path="/post/:id" exact component={Post} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />

        </Layout>        
      </ApolloProvider>
      <CssBaseline />
    </Router>
  )
}

export default App