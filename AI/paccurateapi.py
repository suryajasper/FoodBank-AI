import requests

class Paccurate:
	def __init__(self, packets, box):
		self.key = 'chA4UH4dubpaVngnOMfE0n675_uOaz22euI98eDoum-UkT1wERz7brJHcRyU2VZs'
		self.packets = packets
		self.box = box
		print(self.packets, self.box)

	def pack(self):
		r = {}
		items = []
		for i in range(len(self.packets)):
			item = {'refid': i}
			item['dimensions'] = self.packets[i]['dimensions']
			item['quantity'] = self.packets[i]['quantity']
			item['weight'] = 0
			items.append(item)
		r['itemSets'] = items
		
		box = {}
		box['weightmax'] = 0
		box['name'] = 'box'
		box['dimensions'] = self.box
		r['boxTypes'] = [box]

		print(r)

		d = requests.post('http://api.paccurate.io/', data = r, headers={'Authorization': 'apike ' + self.key}).json()
		print(d)
		return {'coords': d['boxes'][0]['box']['items'], 'svgs': d['svgs']}