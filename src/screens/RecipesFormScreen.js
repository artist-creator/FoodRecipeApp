import React, { useState } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Image
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RecipesFormScreen(){

const navigation = useNavigation();
const route = useRoute();

const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};

const [title,setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
const [image,setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
const [description,setDescription] = useState(
recipeToEdit ? recipeToEdit.description : ""
);

const saverecipe = async () => {

try{

const newrecipe = {
title,
image,
description
};

const storedrecipes = await AsyncStorage.getItem("customrecipes");

let recipes = storedrecipes ? JSON.parse(storedrecipes) : [];

if(recipeToEdit){

recipes[recipeIndex] = newrecipe;

if(onrecipeEdited){
onrecipeEdited();
}

}else{

recipes.push(newrecipe);

}

await AsyncStorage.setItem(
"customrecipes",
JSON.stringify(recipes)
);

navigation.goBack();

}catch(error){

console.log("Error saving recipe:",error);

}

};

return(

<View style={styles.container}>

<TextInput
placeholder="Recipe Title"
value={title}
onChangeText={setTitle}
style={styles.input}
/>

<TextInput
placeholder="Image URL"
value={image}
onChangeText={setImage}
style={styles.input}
/>

{image ? (
<Image
source={{uri:image}}
style={styles.preview}
/>
) : (
<Text>Upload Image URL</Text>
)}

<TextInput
placeholder="Description"
value={description}
onChangeText={setDescription}
multiline
style={styles.textarea}
/>

<TouchableOpacity
onPress={saverecipe}
style={styles.button}
>

<Text style={styles.buttonText}>
Save Recipe
</Text>

</TouchableOpacity>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20
},

input:{
borderWidth:1,
borderColor:"#ccc",
padding:10,
marginBottom:10,
borderRadius:10
},

textarea:{
borderWidth:1,
borderColor:"#ccc",
padding:10,
height:100,
marginBottom:10,
borderRadius:10
},

preview:{
width:"100%",
height:200,
borderRadius:10,
marginBottom:10
},

button:{
backgroundColor:"#fbbf24",
padding:15,
alignItems:"center",
borderRadius:10
},

buttonText:{
fontWeight:"bold"
}

});