import React from "react";
import axios from "axios"

//https://economia.awesomeapi.com.br/json/last/USD-BRL

async function usdToReal(){
    const response = await axios({
        method: 'get',
        url: `https://economia.awesomeapi.com.br/json/last/USD-BRL`,
        
    }).then(function (response) {
        //handle success
        console.log(response.data, "OK");

    }).catch(function (response) {
        //handle error
        console.log(response);
      })  
}

export default usdToReal;