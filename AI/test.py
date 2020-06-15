import paccurateapi

pp = paccurateapi.Paccurate([{'dimensions': {'x': 1, 'y': 1, 'z': 1}, 'quantity': 5}], {'x': 23, 'y': 56, 'z': 67})
print(pp.pack())