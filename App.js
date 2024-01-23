import React from 'react'
import { View ,StyleSheet} from 'react-native'
import TexttoSpeech from './src/TexttoSpeech'
export default function App() {
  return (
 <View style={styles.container}>
  <TexttoSpeech/>
 </View>
  )
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#f0f0f0',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
},
});