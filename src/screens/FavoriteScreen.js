import React from "react";

import {
View,
Text,
FlatList,
Image,
TouchableOpacity,
StyleSheet
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function FavoriteScreen(){

const navigation = useNavigation();

const favoriteRecipesList = useSelector(
state => state.favorites.favoriterecipes
);

if(!favoriteRecipesList.length){

return(

<View style={styles.emptyContainer}>

<Text>No favorite recipes yet!</Text>

<TouchableOpacity
onPress={() => navigation.goBack()}
style={styles.backButton}
>

<Text>Go Back</Text>

</TouchableOpacity>

</View>

);

}

return(

<View style={styles.container}>

<Text style={styles.heading}>
My Favorite Recipes
</Text>

<FlatList
data={favoriteRecipesList}
keyExtractor={(item) => item.idFood}
renderItem={({item}) => (

<TouchableOpacity
style={styles.card}
onPress={() => navigation.navigate("RecipeDetail", item)}
>

<Image
source={{ uri: item.recipeImage }}
style={styles.image}
/>

<Text>
{item.recipeName.substring(0,20)}...
</Text>

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

heading:{
fontSize:22,
fontWeight:"bold",
marginBottom:10
},

card:{
marginBottom:15
},

image:{
width:"100%",
height:150,
borderRadius:10
},

emptyContainer:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

backButton:{
marginTop:20,
padding:10,
backgroundColor:"#ddd",
borderRadius:10
}

});