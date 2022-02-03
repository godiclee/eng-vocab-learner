from codecs import ignore_errors

levels = []
with open('phrase.csv','r') as f:
	for line in f.readlines():
		for i, item in enumerate(line.split(':')):
			print(item.strip("'"))
			if i == 6:
				levels.append(item)
print(levels.count('0'))
print(levels.count('1'))

