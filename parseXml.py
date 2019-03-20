import json
import xmltodict

with open("export.xml", 'r') as f:
	xmlString = f.read()

jsonString = json.dumps(xmltodict.parse(xmlString), indent=4)

# print("\nJSON output(output.json):")
# print(jsonString)
 
with open("steps.json", 'w') as f:
    f.write(jsonString)