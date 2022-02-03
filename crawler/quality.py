List = []
level1 = 0
level2 = 0
level3 = 0
level4 = 0
with open('quality.csv' ,'r') as f:
	for i, line in enumerate(f.readlines()):
		if i == 0:
			continue
		new = {}
		line = line.strip().split(':')
		line = [i.strip("'").replace("''","'") for i in line]
		new["word"] = line[0]
		new["chi"] = line[2]
		new["eng"] = 'Unit ' + line[-1]
		new["pos"] = line[1]
		new["chisen"] = line[6]
		new["engsen"] = line[3]
		if int(line[-1]) <= 13:
			level = 1
			level1 += 1
		elif int(line[-1]) >= 14 and int(line[-1]) <= 20:
			level = 2
			level2 += 1
		elif int(line[-1]) >= 34 and int(line[-1]) <= 40:
			level = 2
			level2 += 1
		elif int(line[-1]) >= 21 and int(line[-1]) <= 33:
			level = 3
			level3 += 1
		elif int(line[-1]) >= 41 and int(line[-1]) <= 50:
			level = 4
			level4 += 1
		else:
			assert 1 == 2
		new["level"] = level
		new["hole"] = int(line[4])
		assert new["hole"] in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
		holes = [int(i) for i in line[5].split(',') if i != '']
		new["holes"] = holes if len(holes) > 0 else [new["hole"]]
		List.append(new)

import json
with open("book.json", 'w') as f:
    json.dump(List, f)
print(level1, level2, level3, level4)