import React, { useEffect, useState } from "react";

import {
View,
Text,
FlatList,
TouchableOpacity,
StyleSheet,
ActivityIndicator,
Image
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function MyRecipeScreen(){

const navigation = useNavigation();

const [recipes,setrecipes] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(() => {

fetchrecipes();

},[]);

const fetchrecipes = async () => {

try{

const storedrecipes =
await AsyncStorage.getItem("customrecipes");

if(storedrecipes){

setrecipes(JSON.parse(storedrecipes));

}

}catch(error){

console.log(error);

}

setLoading(false);

};

const handlerecipeClick = recipe => {

navigation.navigate("CustomRecipesScreen",{recipe});

};

const handleAddrecipe = () => {

navigation.navigate("RecipesFormScreen");

};

const deleterecipe = async index => {

try{

const updatedrecipes = [...recipes];

updatedrecipes.splice(index,1);

await AsyncStorage.setItem(
"customrecipes",
JSON.stringify(updatedrecipes)
);

setrecipes(updatedrecipes);

}catch(error){

console.log(error);

}

};

const editrecipe = (recipe,index) => {

navigation.navigate("RecipesFormScreen",{
recipeToEdit:recipe,
recipeIndex:index
});

};

if(loading){

return(

<View style={styles.loadingContainer}>

<ActivityIndicator size="large"/>

</View>

);

}

return(

<View style={styles.container}>

<TouchableOpacity
onPress={() => navigation.goBack()}
style={styles.backButton}
>

<Text>Back</Text>

</TouchableOpacity>

<TouchableOpacity
onPress={handleAddrecipe}
style={styles.addButton}
>

<Text>Add New Recipe</Text>

</TouchableOpacity>

<FlatList
data={recipes}
keyExtractor={(item,index) => index.toString()}
renderItem={({item,index}) => (

<TouchableOpacity
onPress={() => handlerecipeClick(item)}
style={styles.card}
testID="handlerecipeBtn"
>

{item.image ? (

<Image
source={{uri:item.image}}
style={styles.recipeImage}
/>

):null}

<Text style={styles.title}>
{item.title}
</Text>

<Text testID="recipeDescp">

{item.description
? item.description.substring(0,50)+"..."
: ""}

</Text>

<View testID="editDeleteButtons">

<TouchableOpacity
onPress={() => editrecipe(item,index)}
style={styles.editButton}
>

<Text>Edit</Text>

</TouchableOpacity>

<TouchableOpacity
onPress={() => deleterecipe(index)}
style={styles.deleteButton}
>

<Text>Delete</Text>

</TouchableOpacity>

</View>

</TouchableOpacity>

)}
/>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20
},

loadingContainer:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

backButton:{
padding:10,
backgroundColor:"#ddd",
borderRadius:10,
marginBottom:10
},

addButton:{
padding:10,
backgroundColor:"#fbbf24",
borderRadius:10,
marginBottom:15
},

card:{
marginBottom:20,
borderBottomWidth:1,
paddingBottom:10
},

recipeImage:{
width:"100%",
height:150,
borderRadius:10
},

title:{
fontWeight:"bold",
fontSize:18
},

editButton:{
marginTop:5
},

deleteButton:{
marginTop:5
}

});