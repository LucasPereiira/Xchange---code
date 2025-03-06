import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView, Alert, Platform } from "react-native";
import {  MaterialIcons, Entypo,FontAwesome, AntDesign    } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-picker/picker';

export default function CalcVet(){

    const [euro, setEuro] = useState("eu");
    const [real, setReal] = useState();
    const [vet, setVet] = useState();
    const [vetCalc, setVetCalc] = useState();
    const [vetList, setVetList] = useState();
    const [mediaVet, setMediaVet] = useState();
    const [mediaVetCalc, setMediaVetCalc] = useState();
    const [selectedLanguage, setSelectedLanguage] = useState();

    function media(){
        var atual = 0;
    if (vetList == undefined){}else{
    for (var i = 0; i < vetList.length; i++){
        console.log(vetList[i].valorCalc, "Valor tabela:", i)       
        atual = atual + parseFloat(vetList[i].valorCalc);       
        
        console.log( "Valor atual:" , atual)
    }

    var mediaFinal = atual / vetList.length 
    console.log( "Valor media:" , vetList.length)
    console.log( "Valor media:" , mediaFinal)

    setMediaVet(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        mediaFinal
      ));
    setMediaVetCalc(mediaFinal);
    }
}

function duvida()
{
    Alert.alert("Orientações", "Nesta tela você deve preencher o valor total em reais que transferiu no câmbio e o valor total em euros que recebeu. \nAssim será calculado o valor efetivo total (V.E.T)\n\n- Após preencher duas transações, a média é calculada. Você pode clicar no botão de salvar para que fique gravado o V.E.T nas próximas vezes que for utilizar. ")
}


    function calcReal(text){
        setReal(text)
        if (euro == ''){

        }else if (euro == undefined){

        }else{
        var result = text / euro;

        setVet(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        result
      ));
    }
    }

    function calcEuro(text){
        setEuro(text)
        if (real == ''){

        }else if (real == undefined){

        }else{
            var result = real / text;

            setVet(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        result
      ))
      setVetCalc(result)
            console.log(result)
        }
        
    }

    function adicionarVET(){               
        
    if (vetList == undefined){
        setVetList([{id:Math.random() +"2",valor:vet, valorCalc: vetCalc}])
    }else{
        vetList.push({id:Math.random() +"2",valor:vet, valorCalc: vetCalc})
    }

        setEuro(0);
        setReal(0);
        setVet(0);
        media();
    }

    function renderValor(valor){        
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                valor
              )        
    }

    function flatList(){
        if (vetList == undefined){

        }else{        
        return(            
            <View style = {[styles.card, styles.shadowProp]}>
                <Text style={styles.titulo} >Lista de V.E.T:</Text>
                
                <FlatList data={vetList} keyExtractor={item => item.id}
                    renderItem={({item}) =>
                    <View>
                    <Text style={{marginLeft:5, fontFamily:'Poppins'}}>O V.E.T deste câmbio foi: {renderValor(item.valorCalc)}</Text> 
                    </View> 
                }/>
                
                {vetMedia()}
            </View>           
        )
    }
}

    function vetMedia(){
        if (mediaVet == undefined){}else{
            return(
                <View style={{borderTopWidth:1, marginTop:10, borderColor:'#D6D6D8', flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.titulo}>V.E.T Médio: {mediaVet}</Text>
                    <TouchableOpacity onPress={save}>
                    <FontAwesome name="save" size={35} color="black" />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    async function save(){        
            await AsyncStorage.setItem('vet', mediaVetCalc.toString())
            console.log("salvei em")        
    }

    function Imageem(){
        if (selectedLanguage == 'us'){
            return(
                <View style={{flexDirection:'row'}}>
                  <Image source={require('../../src/images/eua.png')}/>
                  <Text style={styles.titulo}>EUA:</Text>            
                </View>                
            );
        }
        else if (selectedLanguage == 'ar'){
            return(
                <View style={{flexDirection:'row'}}>
                  <Image source={require('../../src/images/arg.png')}/>
                  <Text style={styles.titulo}>Peso ARG:</Text>
                </View>                
            )
        }
        else if (selectedLanguage == 'ur'){
            return(
                <View style={{flexDirection:'row'}}>
                  <Image source={require('../../src/images/uru.png')}/>
                  <Text style={styles.titulo}>Peso UYU:</Text>
                </View>                
            )
        }
        else if (selectedLanguage == 'gu'){
            return(
                <View style={{flexDirection:'row'}}>
                  <Image source={require('../../src/images/gua.png')}/>
                  <Text style={styles.titulo}>Guarani:</Text>
                </View>                
            )
        }
        else if (selectedLanguage == 'ye'){
            return(
                <View style={{flexDirection:'row'}}>
                  <Image source={require('../../src/images/yuan.png')}/>
                  <Text style={styles.titulo}>Yuan:</Text>
                </View>                
            )
        }
        else if (selectedLanguage == 'cop'){
            return(
                <View style={{flexDirection:'row'}}>
                  <Image source={require('../../src/images/cop.png')}/>
                  <Text style={styles.titulo}>Peso Col:</Text>
                </View>                
            )
        }
        else {
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
                <TextInput keyboardType="number-pad" style={styles.input} placeholder='Digite o Dólar' value={euro} onChangeText={(text) => calcEuro(text)}></TextInput>                
            );
        }else if (selectedLanguage == 'eu'){
            return(
                <TextInput keyboardType="number-pad" style={styles.input} placeholder='Digite o Euro' value={euro} onChangeText={(text) => calcEuro(text)}></TextInput>                
            )
        }else if (selectedLanguage == 'ar'){
            return(
                <TextInput keyboardType="number-pad" style={styles.input} placeholder='Digite o Peso ARG' value={euro} onChangeText={(text) => calcEuro(text)}></TextInput>                
            )
        }else if (selectedLanguage == 'ur'){
            return(
                <TextInput keyboardType="number-pad" style={styles.input} placeholder='Digite o Peso UYU' value={euro} onChangeText={(text) => calcEuro(text)}></TextInput>                
            )
        }else if (selectedLanguage == 'gu'){
            return(
                <TextInput keyboardType="number-pad" style={styles.input} placeholder='Digite o Guarani' value={euro} onChangeText={(text) => calcEuro(text)}></TextInput>                
            )
        }else if (selectedLanguage == 'ye'){
            return(
                <TextInput keyboardType="number-pad" style={styles.input} placeholder='Digite o Yuan' value={euro} onChangeText={(text) => calcEuro(text)}></TextInput>                
            )
        }else if (selectedLanguage == 'cop'){
            return(
                <TextInput keyboardType="number-pad" style={styles.input} placeholder='Digite o Peso Col' value={euro} onChangeText={(text) => calcEuro(text)}></TextInput>                
            )
        }
      }

      function vetSet(text){
        setVet(text);
        setVetCalc(text);
      }

    return(    
       <ScrollView>
        <View style={styles.container}>
       
            <View style = {[styles.card, styles.shadowProp]}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <View style={{flex:0.5}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={require('../../src/images/br.png')}/>
                <Text style={styles.titulo}>Real: </Text>
              </View>
              <TextInput keyboardType="number-pad" style={styles.input} placeholder='Digite o real' value={real} onChangeText={(text) => calcReal(text)}></TextInput>
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
                {input()}
          </View>
        </View>
        </View>
        

        <View style = {[styles.card, styles.shadowProp]}>
            <View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <MaterialIcons name="attach-money" size={24} color="black" />
                <Text style={styles.titulo}>V.E.T deste câmbio foi: </Text>                
            </View>
            <TextInput keyboardType="number-pad" style={styles.input} placeholder='Digite o V.E.T' value={vet} onChangeText={(text) => vetSet(text)}></TextInput>  

            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>

            <TouchableOpacity onPress={duvida} style={{alignItems:'center', justifyContent:'center'}}>
                <AntDesign name="questioncircleo" size={30} color="black" />  
            </TouchableOpacity> 

            
                <TouchableOpacity style={styles.button1} onPress={() => adicionarVET()}>
                    <View style={styles.button}>
                        <Entypo name="add-to-list" size={24} color="white" />
                        <Text style={styles.textButton}>Adicionar V.E.T a lista</Text>
                    </View>
                </TouchableOpacity> 
                </View>
            </View>
        </View>  

        {flatList()}
                    
    
    </View>
    </ScrollView> 
    
        
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between'
    
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
  backgroundColor:'white',
  fontFamily:'Poppins'
},
text:{
    borderWidth:2,
    borderRadius:8,  
    height:40,
    marginTop:2,          
    padding:5,
    fontSize:20,
    backgroundColor:'white',    
    fontWeight:'bold',
    textAlignVertical: 'center'
  },
titulo:{
  fontSize:25,
  fontFamily:'Bebas',
  marginLeft:5
},
button1:{
    borderRadius:8,    
    
    alignItems:'flex-end'
},
button:{
    flexDirection:'row',
    padding:8,
    backgroundColor:"green",    
    borderRadius:8,
    borderWidth:2,
    
    alignItems:'flex-end'
},
textButton:{
    color:'white',
    marginLeft:5,
    fontSize:15,
    fontFamily:'Poppins'
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
});