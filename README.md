# Food-Bank-AI
a more efficient way to deal with the lessening food supply in food banks due to COVID-19 using AI (a project for GeomsHacks)
# Problem
Due to the mass demand for food due to the lockdown and COVID-19, a lot of food shelters have been running out of food.
# Solution
Rather than trying to convince a lot of people to donate which never really works, we can create a more efficient way to manage food in the food banks so that we don’t run out as quick
# What it does
- The website is to be used by the government and food bank chains to see the amount of food in each bank, gather inventory, see how food should be transported on trucks, and the AI handles all of the code concerning to which food shelters food should be sent, how buses should be packed and their routes, while taking into account the needs of the clients
- The app is to be used by homeless people or anyone else who needs food from food banks to select a well balanced meal from what is in the closest bank as well as track whether they’re getting the proper amount of calories and nutrients or not.
# How it works
- Website made with HTML, JS, CSS, Node.js, and Socket.io, and uses Paccurate API to find percentage of space used by food shelters, how food should fit in the trucks, and which food shelters the food should be sent to
- App made with QT, C++ and gets client info and suggestions and sends requests to server
- AI Written in python and figures out which food shelters food should be transported to based on distance to near homeless shelters and how filled up they are, routes for buses, and much more
# Languages, Libraries and APIs used
- Python
- JavaScript
- C++
- HTML
- CSS
- Node.js
- Socket.io
- Flask.py
- QT
- Paccurate API
