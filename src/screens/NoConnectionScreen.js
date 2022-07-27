import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { SECONDARY_COLOR } from '../constants/StyleColor';

const NoConnectionScreen = (props) => {
  return (
    <View style={styles.container}>
    <Image
      source={require('../../assets/images/no_connections.png')}
      style={{width:'30%',height:'30%'}}
      resizeMode="contain"
    />
    <Text>Check you connection</Text>
    {/* <Button title="Reload page" onPress={props.onCheck}/> */}
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default NoConnectionScreen