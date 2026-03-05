import React, { useState } from "react";

import {
View,
Text,
ScrollView,
Image,
StyleSheet
} from "react-native";

import { StatusBar } from "expo-status-bar";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Categories from "../components/categories";
import Recipes from "../components/recipes";

export default function HomeScreen(){

const [activeCategory,setActiveCategory] = useState("Chicken");

const categories = [

{
id:1,
strCategory:"Chicken",
strCategoryThumb:"https://www.themealdb.com/images/category/chicken.png"
},

{
id:2,
strCategory:"Beef",
strCategoryThumb:"https://www.themealdb.com/images/category/beef.png"
},

{
id:3,
strCategory:"Dessert",
strCategoryThumb:"https://www.themealdb.com/images/category/dessert.png"
}

];

const allFood = [

{
idFood:"1",
recipeName:"Chicken Curry",
recipeInstructions:"Cook chicken with spices and serve hot",
recipeImage:"https://www.themealdb.com/images/media/meals/1529444830.jpg",
category:"Chicken"
},

{
idFood:"2",
recipeName:"Beef Steak",
recipeInstructions:"Grill beef steak with seasoning",
recipeImage:"https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
category:"Beef"
},

{
idFood:"3",
recipeName:"Chocolate Cake",
recipeInstructions:"Bake chocolate cake with cocoa powder",
recipeImage:"https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg",
category:"Dessert"
}

];

const handleChangeCategory = category => {
setActiveCategory(category);
};

const filteredfoods = allFood.filter(
item => item.category === activeCategory
);

return(

<View style={styles.container}>

<StatusBar style="dark" />

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:50}}
testID="scrollContainer"
>

<View style={styles.header} testID="headerContainer">

<Image
source={{
uri:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
}}
style={styles.avatar}
/>

<Text style={styles.greeting}>
Hello, User!
</Text>

</View>

<View style={styles.titleContainer} testID="titleContainer">

<Text style={styles.title}>
Make your own food
</Text>

<Text style={styles.subtitle}>
Stay at home
</Text>

</View>

<View testID="categoryList">

<Categories
categories={categories}
activeCategory={activeCategory}
handleChangeCategory={handleChangeCategory}
/>

</View>

<View testID="foodList">

<Recipes
foods={filteredfoods}
categories={categories}
/>

</View>

</ScrollView>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#fff",
padding:20
},

header:{
flexDirection:"row",
alignItems:"center",
marginBottom:10
},

avatar:{
width:40,
height:40,
borderRadius:20,
marginRight:10
},

greeting:{
fontSize:18,
fontWeight:"bold"
},

titleContainer:{
marginVertical:10
},

title:{
fontSize:22,
fontWeight:"bold"
},

subtitle:{
color:"gray"
}

});