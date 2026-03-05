import React from "react";
import {
View,
Text,
ScrollView,
Image,
TouchableOpacity,
StyleSheet
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function RecipeDetailScreen(props){

const navigation = useNavigation();
const dispatch = useDispatch();

const recipe = props.route.params;

const favoriteRecipes = useSelector(
state => state.favorites.favoriterecipes
);

const isFavorite = favoriteRecipes.find(
item => item.idFood === recipe.idFood
);

return(

<ScrollView style={styles.container}>

<View testID="imageContainer">

<Image
source={{ uri: recipe.recipeImage }}
style={styles.recipeImage}
/>

</View>

<View style={styles.buttonContainer}>

<TouchableOpacity
onPress={() => navigation.goBack()}
style={styles.backButton}
>

<Text>Back</Text>

</TouchableOpacity>

<TouchableOpacity
onPress={() => dispatch(toggleFavorite(recipe))}
style={styles.favoriteButton}
>

<Text>
{isFavorite ? "♥" : "♡"}
</Text>

</TouchableOpacity>

</View>

<View testID="recipeTitle">

<Text style={styles.title}>
{recipe.recipeName}
</Text>

</View>

<View testID="recipeCategory">

<Text style={styles.category}>
{recipe.category}
</Text>

</View>

<View style={styles.sectionContainer}>

<Text style={styles.sectionTitle}>
Instructions
</Text>

<Text style={styles.instructionsText}>
{recipe.recipeInstructions}
</Text>

</View>

</ScrollView>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20
},

recipeImage:{
width:"100%",
height:250,
borderRadius:15
},

buttonContainer:{
flexDirection:"row",
justifyContent:"space-between",
marginVertical:15
},

backButton:{
padding:10,
backgroundColor:"#ddd",
borderRadius:10
},

favoriteButton:{
padding:10,
backgroundColor:"#ddd",
borderRadius:10
},

title:{
fontSize:24,
fontWeight:"bold"
},

category:{
color:"gray",
marginBottom:10
},

sectionContainer:{
marginTop:20
},

sectionTitle:{
fontSize:18,
fontWeight:"bold"
},

instructionsText:{
marginTop:10,
lineHeight:22
}

});