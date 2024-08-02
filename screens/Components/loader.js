import React, { Component } from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const Loader = (props) => {
  const {loading, ...attributes} = props;
 
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {/* <ActivityIndicator
            animating={true}
            color="#348ceb"
            size="large"
            style={styles.activityIndicator}
          /> */}
          <BarIndicator color='#f5571d' size={20}/>
        </View>
      </View>
    </Modal>
  );
};
 
export default Loader;
 
const styles = StyleSheet.create({
  modalBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height: 80,
    width: 80,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});