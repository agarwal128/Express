import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient, Svg } from 'expo';
let { height, width } = Dimensions.get('window');

import API from '../../api';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: API.currentLang ? API.currentLang : "en-US"
    }
  }

  componentDidMount(){
    this.setState({
      data: API.currentLang ? API.currentLang : "en-US"
    })
  }

  choose(data){
    this.setState({data});
    API.changeLang(data.split("-")[0]);
    API.segment.trackWithProperties("chooseLanguage", {lang: data});
  }

  getStyle(data){
    if(this.state.data == data){
      return {flexDirection: "row", alignItems: "center", margin: 5, paddingHorizontal: 10, backgroundColor: "#C7CFE2", borderRadius: 5, overflow: "hidden"};
    }else{
      return {flexDirection: "row", alignItems: "center", margin: 5, paddingHorizontal: 10};
    }
  }

  render() {
    return (
      <View style={styles.holder}>
        <View>
          <Text style={styles.holderTitle}>{API.UIText("setupZeroHeading", this.state.data.split('-')[0])}</Text>
          <Text style={styles.holderContent}>{API.UIText("setupZeroContent", this.state.data.split('-')[0])}</Text>
        </View>

        <View style={{flexDirection: "column", marginHorizontal: "10%"}}>
          <TouchableOpacity onPress={() => this.choose("en-us")} style={this.getStyle("en-us")}>
            <Image source={require("../../assets/flag/en-us.png")} style={styles.avatarImage}/>
            <Text style={styles.langText}>English (US)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.choose("en-gb")} style={this.getStyle("en-gb")}>
            <Image source={require("../../assets/flag/en-gb.png")} style={styles.avatarImage}/>
            <Text style={styles.langText}>English (GB)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.choose("de-de")} style={this.getStyle("de-de")}>
            <Image source={require("../../assets/flag/de-de.png")} style={styles.avatarImage}/>
            <Text style={styles.langText}>Deutsche</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.choose("fr-fr")} style={this.getStyle("fr-fr")}>
            <Image source={require("../../assets/flag/fr-fr.png")} style={styles.avatarImage}/>
            <Text style={styles.langText}>Français</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.props.button(this.state.data, 0)} style={styles.button}>
          <Text style={styles.buttonText}>{API.UIText("setupZeroButton", this.state.data.split('-')[0])}</Text>
        </TouchableOpacity>
        <Text style={styles.copy}>It Works</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    overflow: "hidden",
    justifyContent: "space-around"
  },
  holderTitle: {
    width: "80%",
    color: "#00b2d6",
    fontSize: 24,
    margin: "10%",
    marginTop: "7%",
    marginBottom: "5%",
    fontWeight: "700",
    textAlign: "center"
  },
  holderContent: {
    width: "80%",
    color: "#687782",
    fontSize: 18,
    marginHorizontal: "10%",
    marginBottom: "5%",
    textAlign: "center"
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#00b2d6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    margin: "10%"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  copy: {
    color: "#bbb",
    textAlign: "center"
  },
  avatarImage: {
    width: 40,
    height: 40
  },
  langText: {
    marginHorizontal: 10
  }
});
