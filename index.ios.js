/**
 * Meow Marie
 * https://github.com/facebook/react-native
 * @flow
 */

// Import the react-native-sound module
const Sound = require('react-native-sound');
let meow, purring;

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Navigator
} from 'react-native';

import calculateDuration from './App/Utils/loopCalculator';

class MeowMarie extends Component {
  constructor(props) {
    super(props);
    state = {
      value: this.props.value,
    };
  }
  componentDidMount() {
    console.log('Loaded');
    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    meow = new Sound('Cat_Meow.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('duration in seconds: ' + meow.getDuration() +
            'number of channels: ' + meow.getNumberOfChannels());
      }
    });

    purring = new Sound('Cat_Purring.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else {
        console.log('duration in seconds: ' + meow.getDuration() +
            'number of channels: ' + meow.getNumberOfChannels());
      }
    });
  }
  _onPressButton() {
    meow.play((success) => {
      if (success) {
        console.log('successfully finished playing');

      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }
  _onAnotherButton() {
    purring.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }
  _onLoop() {
    let loopFor = calculateDuration(meow, 10);
      meow.play((success) => {
      if (success) {
        console.log('successfully finished playing', loopFor);
        meow.setNumberOfLoops(loopFor);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }
  _sendStopSignal() {
    meow.stop();
    purring.stop();
  }
  render() {
    const routes = [
      {title: 'First cat', index: 0, image: 'cute_cat.jpg'},
      {title: 'Second cat', index: 1, image: 'cute_cat.jpg'},
      {title: 'Thrid cat', index: 2, image: 'cute_cat.jpg'},
    ];
    return (
    <Navigator
        initialRoute={routes[0]}
        intialRouteStack={routes}
        renderScene={(route, navigator) =>
          <View style={styles.container}>
           <TouchableHighlight onPress={this._onPressButton}>
            <Image
                style={styles.cat}
                source={{uri: route.image}}
              />
          </TouchableHighlight>
            <TouchableHighlight onPress={() => {
              if (route.index === 0) {
                  navigator.push(routes[1]);
              } else if (route.index === 1) {
                  navigator.push(routes[2]);
              } else {
                navigator.pop();
              }
            }}>
            <Text>Swipe for more cats {route.title}!</Text>
          </TouchableHighlight>
          </View>
        }
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
              { 
                  if (route.index === 0) {
                    return null;
                  } else {
                    return (
                      <TouchableHighlight onPress={() => navigator.pop ()}>
                        <Text> Back </Text>
                      </TouchableHighlight>
                    );
                  }
              },
              RightButton: (route, navigator, index, navState) =>
              {},
              Title: (route, navigator, index, navState) =>
                { return (<Text>Welcome to Meow Marie</Text>); },
            }}
            style={{backgroundColor: 'gray'}}
          />
        }

      />
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6ab9d8',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  cat: {
    width: 320,
    height: 501
  },
  logo: {
    width: 50,
    height: 50
  }
});

AppRegistry.registerComponent('MeowMarie', () => MeowMarie);