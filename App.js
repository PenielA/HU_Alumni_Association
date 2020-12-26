import { StatusBar } from "expo-status-bar";
import React from "react";
import Home from './components/home_page';
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    // <View style = {styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <Home></Home>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});