import requests

class Paccurate:
	def __init__(self, packets, box):
		self.key = 'chA4UH4dubpaVngnOMfE0n675_uOaz22euI98eDoum-UkT1wERz7brJHcRyU2VZs'
		self.packets = packets
		self.box = box

	def pack():
		r = {}
		items = []
		for i in range(len(self.packets)):
			item = {'refid': i}
			item['dimensions'] = self.packets[i]['dimensions']
			item['quantity'] = self.packets[i]['quantity']
			items.append(item)
		r['itemsets'] = items
		
		box = {}
		box['weightmax'] = 0
		box['name'] = 'box'
		box['dimensions'] = self.box
		r['boxtypes'] = box

		d = requests.post('http://api.paccurate.io/', data = r, headers={'Authorization': 'apike ' + self.key}).json()

		return {'coords': d['boxes'][0]['box']['items'], 'svgs': d['svgs']}