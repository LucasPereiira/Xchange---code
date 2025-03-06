import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Platform, ToastAndroid } from 'react-native';
import { FontAwesome, MaterialIcons, AntDesign  } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen'
import { useFonts} from 'expo-font'
import {Picker} from '@react-native-picker/picker';
import usdToReal from '../Components/cotacao';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import 'expo-dev-client';


export default function Principal() {

  const [euro, setEuro] = useState();
  const [real, setReal] = useState();
  const [vet, setVet] = useState();
  const [realToEuru, setRealToEuru] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [cambioAtual, setcambioAtual] = useState(false);
  const [online, setOnline] = useState(true);

  const navigation = useNavigation();
 
  const [fontsLoaded] = useFonts({
    Bebas: require('../Components/fonts/BebasNeue-Regular.ttf'),
    Poppins: require('../Components/fonts/Poppins-Regular.ttf')    
  })
  
    useEffect(() => {
      async function prepare(){
        await SplashScreen.preventAutoHideAsync();
      }
      prepare();
    },[]);

    const onLayout = useCallback(async() => {
      if (fontsLoaded){
        await SplashScreen.hideAsync()
        await loading()
      }
    }, [fontsLoaded])
  
  
  async function loading(){
    const value = await AsyncStorage.getItem('vet')
    if(value !== null) {
        setVet(value);
    }
}

    

  function realToEuro(text){

    if(vet == undefined){
        Alert.alert("ATENÇÃO:", "Preencha o V.E.T (Valor efetivo total) primeiro")  
    }else if(vet == ''){
      Alert.alert("ATENÇÃO:", "Preencha o V.E.T (Valor efetivo total) primeiro")  
    }else{
      const result = text / vet;
      setReal(text) 

      if (selectedLanguage == "us"){
        if (result == Infinity){}else if(result == "NaN"){}else{
          const formatResult =  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
            result
          );      
      setEuro(formatResult);}
    }
    else if (selectedLanguage == "ar"){
      if (result == Infinity){}else if(result == "NaN"){}else{
        const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(
          result
        );      
      setEuro(formatResult);}
    }  
    else if (selectedLanguage == "ur"){
      if (result == Infinity){}else if(result == "NaN"){}else{
        const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'UYU' }).format(
          result
        );      
      setEuro(formatResult);}
    }  
    else if (selectedLanguage == "gu"){
      if (result == Infinity){}else if(result == "NaN"){}else{
        const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'PYG' }).format(
          result
        );      
      setEuro(formatResult);}
    }  
    else if (selectedLanguage == "ye"){
      if (result == Infinity){}else if(result == "NaN"){}else{
        const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'CNY' }).format(
          result
        );      
      setEuro(formatResult);}
    }  
    else if (selectedLanguage == "cop"){
      if (result == Infinity){}else if(result == "NaN"){}else{
        const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(
          result
        );      
      setEuro(formatResult);}
    }       
    else {
      if (result == Infinity){}else if(result == "NaN"){}else{
        const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
          result
        );      
      setEuro(formatResult);}
    }     
      console.log("texto1: ", text)      
      }
  }

  function euroToReal(text){
    if (vet == undefined){
        Alert.alert("ATENÇÃO:", "Preencha o V.E.T (Valor efetivo total) primeiro")  
    }else{
      const result = text * vet;
      setEuro(text)    
    
      console.log("texto2: ", text)
      console.log(result)      

      if (result == Infinity){}else if(result == "NaN"){}else{
      setReal(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        result
      ));
      }    
    }
  }

  function realToEuroVetText(text){

    if(text == ''){
      if(selectedLanguage == "us"){
      const formatResult =  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'  }).format(
        0
      );
      setEuro(formatResult)
    }else{
      const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
        0
      );
      setEuro(formatResult)
    }
    }else if(text == undefined){
        Alert.alert("ATENÇÃO:", "Preencha o V.E.T (Valor efetivo total) primeiro")  
    }else{
      const result = real / text;      

      if (selectedLanguage == "us"){
        if (result == Infinity){}else if(result == NaN){}else{
          const formatResult =  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
            result
          );
          setEuro(formatResult);}      
    }
    else if (selectedLanguage == "ar"){
      if (result == Infinity){}else if(result == 
        NaN){}else{
          const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(
            result
          );
          setEuro(formatResult);} 
            
      }
    else if (selectedLanguage == "ur"){
      if (result == Infinity){}else if(result == 
        NaN){}else{
          const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'UYU' }).format(
            result
          );
          setEuro(formatResult);} 
            
      }
    else if (selectedLanguage == "gu"){
      if (result == Infinity){}else if(result == 
        NaN){}else{
          const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'PYG' }).format(
            result
          );
          setEuro(formatResult);} 
            
      }
    else if (selectedLanguage == "ye"){
      if (result == Infinity){}else if(result == 
        NaN){}else{
          const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'CNY' }).format(
            result
          );
          setEuro(formatResult);} 
            
      }
    else if (selectedLanguage == "cop"){
      if (result == Infinity){}else if(result == 
        NaN){}else{
          const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(
            result
          );
          setEuro(formatResult);} 
            
      }    
    else {
      if (result == Infinity){}else if(result == 
        NaN){}else{
          const formatResult =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
            result
          );
          setEuro(formatResult);} 
            
      }
      console.log("texto3: ", text, result, real, selectedLanguage)
  }
}

  function euroToRealVetText(text){
    if (text == undefined){
        Alert.alert("ATENÇÃO:", "Preencha o V.E.T (Valor efetivo total) primeiro")  
    }else if (euro == undefined){}else{
      const result = euro * text;   
    
      console.log("texto4: ", text)
      console.log(result, euro)

      if (result == Infinity){}else{
      setReal(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        result
      ));
      }    
    }
  }

  function trocar(){
    setRealToEuru(false);
    setEuro(0)
    setReal(0)
  }

  function trocarO(){
    setRealToEuru(true);
    setReal(0)
    setEuro(0)
  }

  function calc(){
    navigation.navigate("Cálculo V.E.T")
  }

  function duvida(){
    Alert.alert("Valor Efetivo Total - V.E.T", "O Valor Efetivo Total (VET) representa o custo de uma operação de câmbio em reais por moeda estrangeira, englobando a taxa de câmbio, as tarifas e tributos incidentes sobre essa operação.")
  }

  function Imageem(){
    if (selectedLanguage == 'us'){
      if (cambioAtual){
        cambioatuali()
      }
        return(
          <View style={{flexDirection:'row'}}>
              <Image source={require('../../src/images/eua.png')}/>
              <Text style={styles.titulo}>EUA:</Text>            
          </View>            
        );
    }else if (selectedLanguage == 'ar'){
      if (cambioAtual){
        cambioatuali()
      }
        return(
          <View style={{flexDirection:'row'}}>
              <Image source={require('../../src/images/arg.png')}/>
              <Text style={styles.titulo}>Peso ARG:</Text>
          </View>
            
        )
    }else if (selectedLanguage == 'ur'){
      if (cambioAtual){
        cambioatuali()
      }
        return(
          <View style={{flexDirection:'row'}}>
              <Image source={require('../../src/images/uru.png')}/>
              <Text style={styles.titulo}>Peso UYU:</Text>
          </View>
            
        )
    }else if (selectedLanguage == 'gu'){
      if (cambioAtual){
        cambioatuali()
      }
        return(
          <View style={{flexDirection:'row'}}>
              <Image source={require('../../src/images/gua.png')}/>
              <Text style={styles.titulo}>Guarani:</Text>
          </View>
            
        )
    }else if (selectedLanguage == 'ye'){
      if (cambioAtual){
        cambioatuali()
      }
        return(
          <View style={{flexDirection:'row'}}>
              <Image source={require('../../src/images/yuan.png')}/>
              <Text style={styles.titulo}>Yuan:</Text>
          </View>
            
        )
    }
    else if (selectedLanguage == 'cop'){
      if (cambioAtual){
        cambioatuali()
      }
        return(
          <View style={{flexDirection:'row'}}>
              <Image source={require('../../src/images/cop.png')}/>
              <Text style={styles.titulo}>Peso Col:</Text>
          </View>
            
        )
    }
   else {
      if (cambioAtual){
        cambioatuali()
      }
        return(
          <View style={{flexDirection:'row'}}>
              <Image source={require('../../src/images/UN.png')}/>
              <Text style={styles.titulo}>Euro:</Text>
          </View>
            
        )
    }
  }

  function input(){
    if (selectedLanguage == 'us'){
        return(
          <TextInput keyboardType="numeric" style={styles.input} placeholder='Digite em Dólar' value={euro} onChangeText={(text) => euroToReal(text)}></TextInput>            
        );
    }
    else if (selectedLanguage == 'ar'){
      return(
        <TextInput keyboardType="numeric" style={styles.input} placeholder='Digite em Peso ARG' value={euro} onChangeText={(text) => euroToReal(text)}></TextInput>            
      )
    }
    else if (selectedLanguage == 'ur'){
      return(
        <TextInput keyboardType="numeric" style={styles.input} placeholder='Digite em Peso UYU' value={euro} onChangeText={(text) => euroToReal(text)}></TextInput>            
      )
    }
    else if (selectedLanguage == 'gu'){
      return(
        <TextInput keyboardType="numeric" style={styles.input} placeholder='Digite em Guarani' value={euro} onChangeText={(text) => euroToReal(text)}></TextInput>            
      )
    }
    else if (selectedLanguage == 'ye'){
      return(
        <TextInput keyboardType="numeric" style={styles.input} placeholder='Digite em Yuan' value={euro} onChangeText={(text) => euroToReal(text)}></TextInput>            
      )
    }
    else if (selectedLanguage == 'cop'){
      return(
        <TextInput keyboardType="numeric" style={styles.input} placeholder='Digite em Peso Col' value={euro} onChangeText={(text) => euroToReal(text)}></TextInput>            
      )
    }
  else{
      return(
        <TextInput keyboardType="numeric" style={styles.input} placeholder='Digite em Euro' value={euro} onChangeText={(text) => euroToReal(text)}></TextInput>            
      )
  }
  }

  function toogleCambioAtual(){
    if (cambioAtual){
      setcambioAtual(false);     
    }else{
      setcambioAtual(true);
      cambioatuali();
    }
  }

  
    async function cambioatuali(){
      console.log("State do cambio atual:", cambioAtual)

      NetInfo.fetch().then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        setOnline(state.isConnected);
      });

      if (online){
          if (selectedLanguage == 'us'){
          const response = await axios({
            method: 'get',
            url: `https://economia.awesomeapi.com.br/json/last/USD-BRL`,        
        }).then(function (response) {
            //handle success
            console.log(response.data.USDBRL.ask, "OK");
            vetSet(response.data.USDBRL.ask)     

        }).catch(function (response) {
            //handle error
            console.log(response);
          })      
        }
        else if(selectedLanguage == 'ar'){
          const response = await axios({
            method: 'get',
            url: `https://economia.awesomeapi.com.br/json/last/ARS-BRL`,        
        }).then(function (response) {
            //handle success
            console.log(response.data.ARSBRL.ask, "OK");
            vetSet(response.data.ARSBRL.ask)     

        }).catch(function (response) {
            //handle error
            console.log(response);
          })      
        }
        else if(selectedLanguage == 'eu'){
          const response = await axios({
            method: 'get',
            url: `https://economia.awesomeapi.com.br/json/last/EUR-BRL`,        
        }).then(function (response) {
            //handle success
            console.log(response.data.EURBRL.ask, "OK");
            vetSet(response.data.EURBRL.ask)     
        }).catch(function (response) {
            //handle error
            console.log(response);
          })   

        }else if(selectedLanguage == 'ur'){
          const response = await axios({
            method: 'get',
            url: `https://economia.awesomeapi.com.br/json/last/UYU-BRL`,        
        }).then(function (response) {
            //handle success
            console.log(response.data.UYUBRL.ask, "OK");
            vetSet(response.data.UYUBRL.ask)     
        }).catch(function (response) {
            //handle error
            console.log(response);
          }) 

        }
        else if(selectedLanguage == 'gu'){
          const response = await axios({
            method: 'get',
            url: `https://economia.awesomeapi.com.br/json/last/PYG-BRL`,        
        }).then(function (response) {
            //handle success
            console.log(response.data.PYGBRL.ask, "OK");
            vetSet(response.data.PYGBRL.ask)     
        }).catch(function (response) {
            //handle error
            console.log(response);
          }) 

        }
        else if(selectedLanguage == 'ye'){
          const response = await axios({
            method: 'get',
            url: `https://economia.awesomeapi.com.br/json/last/CNY-BRL`,        
        }).then(function (response) {
            //handle success
            console.log(response.data.CNYBRL.ask, "OK");
            vetSet(response.data.CNYBRL.ask)     
        }).catch(function (response) {
            //handle error
            console.log(response);
          }) 
        }
        else if(selectedLanguage == 'cop'){
          const response = await axios({
            method: 'get',
            url: `https://economia.awesomeapi.com.br/json/last/COP-BRL`,        
        }).then(function (response) {
            //handle success
            console.log(response.data.COPBRL.ask, "OK");
            vetSet(response.data.COPBRL.ask)     
        }).catch(function (response) {
            //handle error
            console.log(response);
          }) 

        }        
      }
      else{
      Alert.alert("Offline", "Você está offline. Conecte-se em uma rede para pesquisa da cotação atual")
    } 
  }

  function vetSet(text){
    setVet(text)    
    calcAll(text)
}

  function calcAll(text){    
    if (realToEuru){
      realToEuroVetText(text)
    }else{
      euroToRealVetText(text)
    } 
  }   
  

  if(!fontsLoaded) return null

  return (
    realToEuru ?
    <View style={styles.container}  onLayout = {onLayout}>      
      <StatusBar style="auto" />

      <View style = {[styles.card, styles.shadowProp]}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <MaterialIcons name="attach-money" size={24} color="black" />
          <Text style={styles.titulo}>V.E.T: </Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>            
            <Checkbox value={cambioAtual} onValueChange={toogleCambioAtual} color={'black'} />            
            <Text style={{fontFamily:'Poppins', marginLeft:5, textAlignVertical:'center', textAlign:'center'}}>Câmbio atual</Text>            
          </View>
        </View>
        <View style={[styles.input, {flexDirection:'row', alignItems:'center', justifyContent:'space-between'} ]}>
            <TextInput keyboardType="number-pad"  placeholder='Digite o valor efetivo total' value={vet} onChangeText={(text) => vetSet(text)}>
            </TextInput>
            <TouchableOpacity onPress={duvida}>
                <AntDesign name="questioncircleo" size={24} color="black" />  
            </TouchableOpacity>             
        </View>

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:30}}>
          <View style={{flex:0.5}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={require('../../src/images/br.png')}/>
                <Text style={styles.titulo}>Real: </Text>
              </View>
              <TextInput keyboardType="number-pad" style={styles.input} placeholder='Digite em real' value={real} onChangeText={(text) => realToEuro(text)}></TextInput>
          </View>

          <View style={{flex:0.5, marginLeft:5}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                {Imageem()}

                  <View >
                    <Picker   style={{height:5, width:50}} selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                        }>
                      <Picker.Item label="Euro" value="eu" />
                      <Picker.Item label="Dólar" value="us" />
                      <Picker.Item label="Peso ARG" value="ar" />
                      <Picker.Item label="Peso UYU" value="ur" />
                      <Picker.Item label="Guarani" value="gu" />
                      <Picker.Item label="Yuan" value="ye" />
                      <Picker.Item label="Peso Colombiano" value="cop" />
                    </Picker>
                </View>      
              </View>
              <Text style={styles.text}>{euro}</Text>
          </View>
        </View>

        <View style={{alignItems:'flex-end', marginTop:20}}>
          <TouchableOpacity onPress={trocar}>
            <View>
              <FontAwesome name="exchange" size={28} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={calc}>
          <Text style={{fontFamily:'Poppins'}}>Calcular valor efetivo total (V.E.T)</Text>
        </TouchableOpacity>
      </View>
    
    </View>

    :

    <View style={styles.container}  onLayout = {onLayout}>      
      <StatusBar style="auto" />      
      
      <View style = {[styles.card, styles.shadowProp]}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <MaterialIcons name="attach-money" size={24} color="black" />
            <Text style={styles.titulo}>V.E.T: </Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>            
            <Checkbox value={cambioAtual} onValueChange={toogleCambioAtual} color={'black'} />            
            <Text style={{fontFamily:'Poppins', marginLeft:5, textAlignVertical:'center', textAlign:'center'}}>Câmbio atual</Text>            
          </View>
        </View>
        <View style={[styles.input, {flexDirection:'row', alignItems:'center', justifyContent:'space-between'} ]}>
            <TextInput keyboardType="numeric"  placeholder='Digite o valor efetivo total' value={vet} onChangeText={(text) => vetSet(text)}>
            </TextInput>
            <TouchableOpacity onPress={duvida}>
                <AntDesign name="questioncircleo" size={24} color="black" />  
            </TouchableOpacity>             
        </View>     

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:30}}>
          <View style={{flex:0.5}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              {Imageem()}

              <View >
              <Picker   style={{height:5, width:50}} selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                }>
                    <Picker.Item label="Euro" value="eu" />
                    <Picker.Item label="Dólar" value="us" />
                    <Picker.Item label="Peso ARG" value="ar" />
                    <Picker.Item label="Peso UYU" value="ur" />
                    <Picker.Item label="Guarani" value="gu" />
                    <Picker.Item label="Yuan" value="ye" />
                    <Picker.Item label="Peso Colombiano" value="cop" />
            </Picker>
            </View>           
            </View>           

            {input()}          
          </View>

          <View style={{flex:0.5, marginLeft:5, justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
              <Image source={require('../../src/images/br.png')}/>
              <Text style={styles.titulo}>Real: </Text>
            </View>
            <Text style={styles.text}>{real}</Text>
          </View>
        </View>   

        <View style={{alignItems:'flex-end', marginTop:20}}>
          <TouchableOpacity onPress={trocarO}>
            <View>
              <FontAwesome name="exchange" size={28} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={calc}>
          <Text style={{fontFamily:'Poppins'}}>Calcular valor efetivo total (V.E.T)</Text>
        </TouchableOpacity>
      </View>     
            
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
  },  
  card:{
    flexDirection:'column',
    backgroundColor: 'white',
    borderRadius: 8,               
    padding:20,
    width:'90%',    
    marginVertical: 10,
    justifyContent:'space-between'       
},
shadowProp:{
    elevation:20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
},
input:{
  borderWidth:2,
  borderRadius:8,  
  height:40,
  marginTop:2,          
  padding:5,
  fontSize:15,
  backgroundColor:'white'
},
text:{
    borderWidth:2,
    borderRadius:8,  
    height:40,
    marginTop:2,          
    padding:5,
    fontSize:15,
    backgroundColor:'white',    
    fontWeight:'bold',
    textAlignVertical: 'center',
    fontFamily:'Poppins'
  },
titulo:{
  fontSize:25,  
  marginLeft:5,
  fontFamily:'Bebas'
},
picker:{
      width:120,  
      justifyContent:'center',   
      paddingVertical:4, 
      backgroundColor: '#FFF',
      borderWidth:1,
      borderRadius:20,
      marginTop:10       
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
});