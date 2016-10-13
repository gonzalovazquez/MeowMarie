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
      {title: 'First cat', index: 0},
      {title: 'Second cat', index: 1},
      {title: 'Thrid cat', index: 2},
    ];
    return (
    <Navigator
        initialRoute={routes[0]}
        intialRouteStack={routes}
        renderScene={(route, navigator) =>
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to Meow Marie
            </Text>
           <TouchableHighlight onPress={this._onPressButton}>
            <Image
                style={styles.cat}
                source={{uri: 'cute_cat.jpg'}}
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
                { return (<Text>Cancel</Text>); },
              RightButton: (route, navigator, index, navState) =>
                { return (<Text>Done</Text>); },
              Title: (route, navigator, index, navState) =>
                { return (<Text>Awesome Nav Bar</Text>); },
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
    width: 271,
    height: 501
  },
  logo: {
    width: 50,
    height: 50
  }
});

AppRegistry.registerComponent('MeowMarie', () => MeowMarie);

/*          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to Meow Marie
            </Text>
          <TouchableHighlight onPress={this._onPressButton}>
          <Image
              style={styles.cat}
              source={{uri: 'cute_cat.jpg'}}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this._sendStopSignal}>
            <Text style={styles.welcome}>
              Slide for more cute cats
            </Text>
          </TouchableHighlight>
          </View>*/