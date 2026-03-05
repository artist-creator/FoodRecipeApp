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

export default function Recipes({ foods }) {

const navigation = useNavigation();

const ArticleCard = ({ item }) => {

return (

<View style={styles.card} testID="articleDisplay">

<TouchableOpacity
onPress={() => navigation.navigate("RecipeDetail", item)}
>

<Image
source={{ uri: item.recipeImage }}
style={styles.image}
/>

<Text style={styles.title}>
{item.recipeName}
</Text>

<Text style={styles.desc}>
{item.recipeInstructions.substring(0,40)}...
</Text>

</TouchableOpacity>

</View>

);

};

return (

<View testID="recipesDisplay">

<FlatList
data={foods}
numColumns={2}
keyExtractor={(item) => item.idFood}
renderItem={({ item, index }) => (
<ArticleCard item={item} index={index} />
)}
/>

</View>

);

}

const styles = StyleSheet.create({

card:{
flex:1,
margin:10
},

image:{
width:"100%",
height:120,
borderRadius:10
},

title:{
fontWeight:"bold",
marginTop:5
},

desc:{
color:"gray",
fontSize:12
}

});