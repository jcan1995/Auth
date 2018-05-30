import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component{

  state = { loggedIn: null };
  /*Lifecycle Method*/
  componentWillMount(){
    /*Initialize Firebase*/
    firebase.initializeApp({
      apiKey: 'AIzaSyCcZpVKuMXQTh6QB9sLqmMBg8Vn2jtmYd8',
      authDomain: 'authentication-fe9bf.firebaseapp.com',
      databaseURL: 'https://authentication-fe9bf.firebaseio.com',
      projectId: 'authentication-fe9bf',
      storageBucket: 'authentication-fe9bf.appspot.com',
      messagingSenderId: '683366995053'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true});
      }else {
        this.setState({loggedIn: false});
      }
    });

  }

  renderContent(){
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.loggedInStyle}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }

  render(){
    return (
      <View>
        <Header headerText = "Authentication"/>
        {this.renderContent()}

      </View>

    );
  }
}

const styles ={
  loggedInStyle: {
    flexDirection: 'row',
    marginTop: 10
  }
};


export default App;
