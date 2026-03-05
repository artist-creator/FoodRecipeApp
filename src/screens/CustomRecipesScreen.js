import React from "react";

import {
View,
Text,
Image,
ScrollView,
TouchableOpacity,
StyleSheet
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function CustomRecipesScreen(){

const navigation = useNavigation();
const route = useRoute();

const { recipe } = route.params || {};

if(!recipe){

return(
<View>
<Text>No Recipe Details Available</Text>
</View>
);
}

return(

<ScrollView style={styles.container}>

<View testID="imageContainer">

<Image
source={{uri:recipe.image}}
style={styles.image}
/>

</View>

<View testID="topButtonsContainer">

<TouchableOpacity
onPress={() => navigation.goBack()}
style={styles.backButton}
>

<Text>Go Back</Text>

</TouchableOpacity>

</View>

<View testID="contentContainer">

<Text style={styles.title}>
{recipe.title}
</Text>

<View>

<Text style={styles.sectionTitle}>
Content
</Text>

<Text>
{recipe.description}
</Text>

</View>

</View>

</ScrollView>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20
},

image:{
width:"100%",
height:250,
borderRadius:15
},

title:{
fontSize:24,
fontWeight:"bold",
marginVertical:10
},

sectionTitle:{
fontWeight:"bold",
marginTop:10
},

backButton:{
marginTop:10,
padding:10,
backgroundColor:"#ddd",
borderRadius:10,
width:100
}

});