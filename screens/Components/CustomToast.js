import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
// Customize the Toast component
const toastConfig = {
      success: ({ text1 }) => (
            <BaseToast
                  style={{
                        borderLeftWidth: 0,
                        borderRadius: 5,
                        backgroundColor: '#f0f0f0',
                        flexDirection: 'row',
                        alignItems: 'center',
                        // padding: 10,
                  }}
                  contentContainerStyle={{
                        // paddingHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                  }}
                  text1Style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: '#333',
                  }}
                  renderLeadingIcon={() => (
                        <View style={{
                              width: '20%',
                              height: '100%',
                              backgroundColor: 'green',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderTopLeftRadius: 5,
                              borderBottomLeftRadius: 5,
                        }}>
                              <Feather name="check-circle" size={25} color="white" />
                        </View>
                  )}
                  text1={text1}
            />
      ),
      error: ({ text1 }) => (
            <BaseToast
                  style={{
                        borderLeftWidth: 0,
                        borderRadius: 5,
                        backgroundColor: '#f0f0f0',
                        flexDirection: 'row',
                        alignItems: 'center',
                        // padding: 10,
                  }}
                  contentContainerStyle={{
                        // paddingHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                  }}
                  text1Style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: '#333',
                  }}
                  renderLeadingIcon={() => (
                        <View style={{
                              width: '20%',
                              height: '100%',
                              backgroundColor: '#db3b3b',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderTopLeftRadius: 5,
                              borderBottomLeftRadius: 5,
                        }}>
                              <Feather name="alert-circle" size={20} color="white" />
                        </View>
                  )}
                  text1={text1}
            />
      ),
};


// CustomToast component to wrap the Toast provider with the configuration
const CustomToast = () => <Toast config={toastConfig} />;

export { CustomToast };
export default Toast;