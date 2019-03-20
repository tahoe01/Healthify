Introduction
-------------
- We used react-native to build our app so it can run on both iOS and Andriod applications. Allowing it to be accessable to everyone.
- react-native: https://facebook.github.io/react-native/docs/getting-started

Summary of our app
------------------
- Healthify is an iOS mobile app that focuses on combating physical health problems, such as overweightness and malnutrition by its unique recommendation 
system which focuses on your diet. Any adults who age from 18 - 50 can use Healthify to build up their physical health as needed. The users will receive 
not only recommendation of the calorie of the food you should eat for weight loss but also tips to help accomplish their fitness goals such as exercise 
in respect of their long term goals. Our App suggests the steps to take in terms of diet and workout adjustments to the goal they set, and all such results
are given based on their personalized model. We build that personal model by taking in the continuous records of what the user has eaten and how much they
have exercised. The target users are adults who wish to keep track and get food suggestions to lose weight or those who want to gain weight and build their 
physics. After taking the users’ body measurements from the users’ input, we ask the users what their goals are in terms of how many pounds of weight they
want to lose or gain. Based on their goals, our recommendation system will provide them with an overview of their daily food consumption and recommend food
to meet a threshold of daily calorie of food they should eat. The model requires text input from users, which asks them what they have eaten and the amount
of calories 

How to run the app
------------------
- Prerequistes (you need a mac to run this) (type all this into the terminal)
	- "brew install node"
	- "brew install watchman"
	- "npm install -g react-native-cli"
- Now you have all that downloaded move our app into a folder
- To save space we left out the libraries (was over 100mb).
	-To get these libraries use command "npm install" in terminal (in the folder where the app is) to get the needed libraries
	-There is a bug where sometimes not all libraries are installed (it's usually react-native-pie library)
		-To solve that type "npm i --save react-native-pie" into the terminal
- Once you have all the libraries 
	-go inside the folder where the app is in the terminal
	-run "react-native run-ios" into your terminal
- Congrats! Now you have the app running on your iOS simulator 
- If you have any problems refer to ( https://facebook.github.io/react-native/docs/getting-started )
	
Our code
--------
- The majority of files are just to help with importing, github setting, etc.
- Our code all lies in App.js, I will say what each class does
		- Class WelcomeScreen is both the welcome screen and the input screen that allows the user to periodically
		input their height and weight as they change
		- Class BuildPersonalModel helps build the personal model. It is essential to the app as its the page where
		the users diet information is collected.
		- Class Recommendations is how we give guidence to the user. It suggests how many calories the user should eat.
		It recommends some foods they can eat, it also reccomends that hwo much excercise the user should get.
		- Class HomeScreen is the screen that welcomes the individual and gets vital information from them.
		- Class Summary is the personal model for the user. It gives long term patterns the users has been following.
		- The rest are functions that help us calculate certain things, like suggested calorite ammount, or stylistic settings.