import React from 'react';
import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import AForm from './AForm';

function App() {
  return (
    <Container maxWidth="lg">
      <Header title="Air Generator"/>
      <AForm/>
    </Container>
  );
}

export default App;
