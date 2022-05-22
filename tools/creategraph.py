import sys
import json
import numpy as np
import matplotlib.pyplot as plt

def mk48_to_real(coords):
	split_coords = coords.split(", ")
	int_coords = (int(split_coords[0].replace("E", "").replace("W", "")), int(split_coords[1].replace("N", "").replace("S", "")))
	
	if split_coords[0].endswith("W"):
		int_coords = (-int_coords[0], int_coords[1])
		
	if split_coords[1].endswith("S"):
		int_coords = (int_coords[0], -int_coords[1])
	
	return int_coords

def read_file(filename):
	f = open(filename, "r")
	data = json.loads(f.read())
	f.close()
	return data
	
_x = []
_y = []

for i in read_file(sys.argv[1]):
	if i["alive"]:
		position = mk48_to_real(i["position"])
		_x.append(position[0])
		_y.append(position[1])
		

x = np.array(_x)
y = np.array(_y)


plt.scatter(x, y, label="waypoints", s=50, marker="o")

plt.xlabel("x")
plt.ylabel("y")

plt.title("Test")
plt.legend()
plt.show()