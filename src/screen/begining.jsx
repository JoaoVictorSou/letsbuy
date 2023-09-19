import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";

const FristPage = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.componentsContainer}>
        <Text style={styles.title}>
          Todos prontos para o nosso The Wall CDA?
        </Text>
        <Button style={styles.submit}   color="#E30000"
          title="Iniciar" 
          onPress={() => Alert.alert('Simple Button pressed')}
        />
</View>
    </SafeAreaView>
  );
  const styles = StyleSheet.create({
    componentsContainer:{
      margin:150,
      padding: 50,
      alignItems: "center",
      justifyContent: "space-around",
      alignContent: "center"
    },
    title: {
      fontFamily: 'Open Sans',
      fontWeight:'800',
      color:"#F8F8F8"
    },
    submit: {
      color:"#E30000",
      borderRadius: 22

    }

  });

  export default FristPage;