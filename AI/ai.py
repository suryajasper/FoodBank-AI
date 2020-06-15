from flask import Flask, escape, request, render_template, make_response, url_for, redirect, jsonify
import requests
from paccurateapi import Paccurate
app = Flask(__name__)

SERVER_NAME = 'suryajasper.com'

def get_distance(p1, p2):
   x = ((p1[0] - p2[0]) ** 2) 
   y = ((p1[1] - p2[1]) ** 2)
   return (x + y) ** 0.5 

def associate_shelters_to_banks(banks, shelters):
   associations = [[] for i in banks]
   for n, i in enumerate(shelters):
      sp = i['pos']
      leastd = 1000
      closestfoodbank = 0
      for m, f in enumerate(banks):
         p = f['pos']
         d = get_distance(p, sp)
         if d < leastd:
            leastd = d
            closestfoodbank = p
      associations[closestfoodbank].append(n)

   return associations

def get_food_requirements(banks, shelters, associations):
   calories = []
   for i in range(len(banks)):
      s = 0
      for f in associations[i]:
         s += shelters[f]['daily_cal'] * 7
      remaining = s - banks[i]['calories']
      if remaining < 0:
         remaining = 0
      calories.append(remaining)

   return (calories)

def find_total_calories(food):
   s = 0
   for i in food:
      s += i[0] * i[1]
   return s

def divide_food(food, banks, shelters):
   shelters_to_banks = associate_shelters_to_banks(banks, shelters)
   calorie_requirements = get_food_requirements(banks, shelters, shelters_to_banks)
   calories = find_total_calories(food)
   calories_req = sum(calorie_requirements)

   if calories < calories_req:
      deficit = (calories_req - calories) / len(shelters)
   
   for i in range(len(banks)):
      c = calorie_requirements[i] - deficit
      # while c > 0:

   return {}

@app.route('/dividefood')
def divide_endpoint():
   food = requests.get(SERVER_NAME + 'food').json()
   banks = requests.get(SERVER_NAME + 'banks').json()
   food = requests.get(SERVER_NAME + 'shelters').json()
   return (jsonify(divide_food(food, banks, shelters)))

@app.route('/pack',  methods=['POST', 'GET'])
def pack():
   if request.method == 'POST':
      json = request.get_json(force=True)
      print(json)
      p = Paccurate(json['packets'], json['box'])
      result = p.pack()
      return(jsonify(result))

if __name__ == '__main__':
   app.run(host='0.0.0.0', port=4001)