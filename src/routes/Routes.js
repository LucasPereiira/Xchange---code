import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Principal from "../screens/Principal";
import CalcVet from "../screens/CalcVet";


const AppStack = createNativeStackNavigator();

function AppRoutes(){
    return(
        <AppStack.Navigator>           
            <AppStack.Screen name="Principal" component={Principal} options={{headerShown: false}}/>   
            <AppStack.Screen name="Cálculo V.E.T" component={CalcVet} />                
        </AppStack.Navigator>
    )
}

export default AppRoutes;