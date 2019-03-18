/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 *
 */

import {AsyncStorage} from 'react-native';
import React, {Component} from 'react';
import {Platform, StyleSheet,SafeAreaView, Text, TextInput, Button, TouchableHighlight, Alert,TouchableOpacity, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Pie from 'react-native-pie'
// import {Col, Row, Grid} from 'react-native-easy-grid';

global.caloreToday = 0


// 100g
var foodData = {
    "Chicken Breast" : 165, //100g
    "Apple" : 95,
    "Orange" : 47,
    "Rice" : 130,
    "Steak" : 271,
    "Pasta No Sauce" : 131,
};


class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        sex: '',
        weight: 0,
        height: 0,
        age: 0,
        };
    }
    render() {
        return (
                // <View style={styles.container}>
                //   <Text style={styles.welcome}>Welcome to Healthify!</Text>
                // </View>
                
                <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Healthify!</Text>
                
                <TextInput
                style={styles.userInput}
                placeholder="Enter Sex"
                onChangeText={(sex) => this.setState({sex})}
                />
                
                <TextInput
                style={styles.userInput}
                placeholder="Enter Weight"
                onChangeText={(weight) => this.setState({weight})}
                />
                
                <TextInput
                style={styles.userInput}
                placeholder="Enter Height"
                onChangeText={(height) => this.setState({height})}
                />
                
                <TextInput
                style={styles.userInput}
                placeholder="Enter Age"
                onChangeText={(age) => this.setState({age})}
                />
                
                <TouchableHighlight onPress={() => {
                this.props.navigation.navigate('Recomendation', {height: this.state.height, weight: this.state.weight, age: this.state.age});
                this.props.navigation.navigate('Home', {sex: this.state.sex, height: this.state.height, weight: this.state.weight, age: this.state.age});
                }} underlayColor="white">
                <View style={styles.button}>
                <Text style={styles.buttonText}>Next ></Text>
                </View>
                </TouchableHighlight>
                </View>
                );
    }
}
class BuildPersonalModel extends Component {
    handleFoodType = (text) => {
        this.setState({ lastMeal: text })
    }
    
    handleCalorieType = (calNum) => {
        this.setState({ calorie: calNum })
    }
    
    submitFoodSelection = (lastMeal, calorie) => {
        global.caloreToday = parseInt(global.caloreToday) + parseInt(calorie)
        this.props.navigation.navigate('Home', {lastMeal: lastMeal, calorie: calorie});
        this.props.navigation.navigate('Recomendation', {calorie: calorie});
        // alert('Last Meal is: ' + lastMeal + " and " + calorie + " kCal")
    }
    
    render() {
        return (
                <SafeAreaView>
                <View style = {styles.dietContainer}>
                <Text style={styles.questions}>What have you eaten today?</Text>
                <TextInput style = {styles.dietInput}
                autoCapitalize = "none"
                onChangeText = {this.handleFoodType}/>
                <Text style={styles.questions}>Do you know how much calorie?</Text>
                <TextInput style = {styles.dietInput}
                autoCapitalize = "none"
                onChangeText = {this.handleCalorieType}/>
                
                <View style={styles.rows}>
                <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                () => this.submitFoodSelection(this.state.lastMeal, this.state.calorie)
                }>
                <Text style = {styles.submitButtonText}> Yes </Text>
                </TouchableOpacity>
                <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                () => this.submitFoodSelection(this.state.lastMeal, 100)
                }>
                <Text style = {styles.submitButtonText}> No </Text>
                </TouchableOpacity>
                </View>
                </View>
                </SafeAreaView>
                )
    }
}

// Need weight in kg
// needs height in cm
// age in years
// USes revisted Harris-Benedict equations
function getCalorineIntake(weight, height, age, sex){
    if (sex === 'Male' || sex === 'male'){
        var caloriesSugesstion = (13.397 * weight) + (4.799 * height) - (5.677 * age) + 88.362 // if male
    }
    else if (sex == 'Female' || sex == 'female'){
        var caloriesSugesstion = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593
    }
    else {
        var caloriesSugesstion = (13.397 * weight) + (4.799 * height) - (5.677 * age) + 88.362
    }
    return parseInt(caloriesSugesstion)
}

function percentCalorieGoal(weight, height, age, sex) {
    var caloreLimit = getCalorineIntake(weight, height, age, sex)
    percentCalorieLeft = (((caloreLimit - global.caloreToday ) / caloreLimit ) * 100 ).toFixed(0)
    return percentCalorieLeft
}

class recommendations extends React.Component {
    render() {
        const { navigation } = this.props;
        const height = navigation.getParam('height', '0');
        const weight = navigation.getParam('weight', '0');
        const calorie = navigation.getParam('calorie', '0')
        const sex = navigation.getParam('sex', 'None')
        const age = navigation.getParam('age', '0');
        // {JSON.stringify(sex).slice(1, -1)}
        // global.caloreToday = parseInt(global.caloreToday) + parseInt(calorie)
        
        const calorireIntake = getCalorineIntake(weight, height, age, sex).toFixed(2)
        return (
                <View style = {{padding: 20}}>
                    <CalorieRec style = {styles.dietContainer} calorieAmmount = {JSON.stringify(calorireIntake - parseInt(global.caloreToday)) } />
                    <Suggesstions/>
                    <Text style = {{textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 22, paddingTop: 90}}> Exercise Recommendation</Text>
                    <Text style = {{textAlign : 'center'} }> Reccomended exercise for the day: 30 minutes </Text>
                </View>
                );
    }
}
// Enter calorie recommendation as calorieAmmount = "Calulated calorie ammount"
class CalorieRec extends React.Component {
    render() {
        return (
                <View style = {{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                <Text style = {styles.questions}>Calorie Recommendation is: {this.props.calorieAmmount} kCal </Text>
                <Text style = {{textAlign: 'center', padding: 10}}> *This ammount is for the rest of the day </Text>
                </View>
                );
    }
}

// Add suggessions
class Suggesstions extends React.Component {
    render() {
        return (
                <View>
                <Text style = {{textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 22, paddingTop: 90}}> Food Recommendation</Text>
                <Text style = {{textAlign: 'center', padding: 5}}>Steak {foodData['Steak']}kCal  per 100g </Text>
                <Text style = {{textAlign: 'center', padding: 5}}>Chicken Breast {foodData['Chicken Breast']}kCal  per 100g </Text>
                <Text style = {{textAlign: 'center', padding: 5}}>Pasta (No Sauce) {foodData['Pasta No Sauce']}kCal  per 100g </Text>
                <Text style = {{textAlign: 'center', padding: 5}}>Rice {foodData['Rice']}kCal  per 100g </Text>
                <Text style = {{textAlign: 'center', padding: 5}}>Apple {foodData['Apple']}kCal  per 100g </Text>
                <Text style = {{textAlign: 'center', padding: 5}}>Orange {foodData['Orange']}kCal  per 100g </Text>
                </View>
                );
    }
}

class HomeScreen extends React.Component {
    render() {
        /*
         Get the param, provide a fallback value if not available
         If users don't input sex, then set default value: "unknown sex"
         If users don't input weight, height, and age, then set default value: -1
         calorie by default equals zero
         */
        const { navigation } = this.props;
        const sex = navigation.getParam('sex', 'unknown sex');
        const height = navigation.getParam('height', '-1');
        const weight = navigation.getParam('weight', '-1');
        const age = navigation.getParam('age', '-1');
        const lastMeal = navigation.getParam('lastMeal', 'None');
        const calorie = navigation.getParam('calorie', '0');
        
        var percentCaloriesLeftToUse = percentCalorieGoal(weight, height, age, sex);
        
        
        return (
                <View>
                <Text style={{top: 50, fontSize:25, fontWeight:'bold', textAlign:'center', padding: 50}}>Home</Text>
                <Text style={{top: 100, fontSize:15, fontWeight:'bold', textAlign:'center', padding: 20}}>sex: {JSON.stringify(sex).slice(1, -1)}</Text>
                <Text style={{top: 100, fontSize:15, fontWeight:'bold', textAlign:'center', padding: 20}}>weight: {JSON.stringify(weight).slice(1, -1)}</Text>
                <Text style={{top: 100, fontSize:15, fontWeight:'bold', textAlign:'center', padding: 20}}>height: {JSON.stringify(height).slice(1, -1)}</Text>
                <Text style={{top: 100, fontSize:15, fontWeight:'bold', textAlign:'center', padding: 20}}>age: {JSON.stringify(age).slice(1, -1)}</Text>
                <Text style={{top: 100, fontSize:15, fontWeight:'bold', textAlign:'center', padding: 20}}>meal: {JSON.stringify(lastMeal).slice(1, -1)}</Text>
                <Text style={{top: 100, fontSize:15, fontWeight:'bold', textAlign:'center', padding: 20}}>calorie: {JSON.stringify(calorie).slice(1, -1)}</Text>
                <Text style={{top: 100, fontSize:15, fontWeight:'bold', textAlign:'center', padding: 20}}> Calorie percent left for today : {percentCaloriesLeftToUse}% </Text>
                <Text style={{top: 100, fontSize:15, fontWeight:'bold', textAlign:'center', padding: 20}}> Exercise percent left for today : 100% </Text>
                
                </View>
                );
    }
}



var months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
};

var currentDay = new Date().getDate();
var currentMonth = months[new Date().getMonth() + 1];
var currentYear = new Date().getYear() + 1900;

class Summary extends Component {
    render() {
        return (
                <View style={styles.container}>
                <Text style={styles.title}>{currentMonth}, {currentYear}{"\n"} Summary</Text>
                
                <Pie
                radius={100}
                series={[15, 40, 45]}
                colors={['#CD5C5C', '#4169E1', '#3CB371']} />
                
                <Text style={{paddingTop: 30, color: '#3CB371'}}>Vege: 45% - 4500 gram</Text>
                <Text style={{paddingTop: 30, color: '#4169E1'}}>Fruit: 40% - 4000 gram</Text>
                <Text style={{padding: 30, color: '#CD5C5C'}}>Meat: 15% - 1500 gram</Text>
                
                <View>
                <Pie
                radius={50}
                innerRadius={45}
                series={[92.5]}
                colors={['#f00']}
                backgroundColor='#ddd'/>
                <View style={styles.gauge}>
                <Text style={styles.gaugeText}>92.5%</Text>
                <Text>Goal</Text>
                </View>
                </View>
                </View>
                
                );
    }
}



// const WelcomeStack = createStackNavigator({
//   Welcome: WelcomeScreen,
//   Home: HomeScreen,
// });

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// });

// const PersonalHealthStack = createStackNavigator({
//   Personal: BuildPersonalModel,
// });


const cbt = createBottomTabNavigator(
                                     {
                                     Welcome: WelcomeScreen,
                                     Home: HomeScreen,
                                     Diet: BuildPersonalModel,
                                     Recomendation: recommendations,
                                     Summary: Summary,
                                     },
                                     {
                                     initialRouteName: "Home"
                                     },
                                     )

export default createAppContainer(cbt);

const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F5FCFF',
                                 padding: 10,
                                 },
                                 welcome: {
                                 fontSize: 25,
                                 fontWeight: 'bold',
                                 textAlign: 'center',
                                 margin: 10,
                                 },
                                 title: {
               
                                 top: -60,
                                 fontSize:25,
                                 fontWeight:'bold',
                                 textAlign:'center',
                                 padding:30,
                                 },
                                 userInput: {
                                 textAlign: 'center',
                                 marginTop: 50,
                                 height: 40,
                                 width: 300,
                                 fontSize: 20,
                                 fontWeight: 'bold',
                                 borderWidth: 3,
                                 borderRadius: 15,
                                 borderColor: '#42bff4',
                                 },
                                 button: {
                                 marginTop: 60,
                                 alignItems: 'center',
                                 },
                                 buttonText: {
                                 padding: 20,
                                 color: '#841583',
                                 fontSize: 30,
                                 fontWeight: 'bold',
                                 },
                                 dietContainer: {
                                 paddingTop: 30,
                                 paddingHorizontal: 50,
                                 // flex: 1,
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 },
                                 questions: {
                                 textAlign: "center",
                                 fontSize:30,
                                 margin: 20,
                                 },
                                 dietInput: {
                                 margin: 30,
                                 fontSize:20,
                                 height: 40,
                                 borderWidth: 2,
                                 width: '100%',
                                 textAlignVertical: 'top',
                                 textAlign: 'center',
                                 marginTop: 50,
                                 fontWeight: 'bold',
                                 borderRadius: 15,
                                 borderColor: '#42bff4',
                                 },
                                 submitButton: {
                                 backgroundColor: '#7a42f4',
                                 padding: 10,
                                 marginTop: 30,
                                 marginLeft: 20,
                                 borderRadius: 10,
                                 marginRight: 20,
                                 height: 50,
                                 width: 120,
                                 },
                                 submitButtonText:{
                                 color: 'white',
                                 textAlign: "center",
                                 fontSize: 20,
                                 },
                                 rows: {
                                 flex: 1,
                                 flexDirection: 'row',
                                 justifyContent: 'space-between'
                                 },
                                 recContainer: {
                                 flex: 1,
                                 padding: 16,
                                 paddingTop: 30,
                                 backgroundColor: '#fff' },
                                 gauge: {
                                 position: 'absolute',
                                 width: 100,
                                 height: 100,
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 },
                                 gaugeText: {
                                 backgroundColor: 'transparent',
                                 color: '#000',
                                 fontSize: 24,
                                 },
                                 });
