import xml.etree.ElementTree as ET

# https://spms.min-saude.pt/wp-content/uploads/2017/01/ET-PDS-WebAPI_v1.3.pdf
hospitals_endpoint = "https://api-qualidade.pds.min-saude.pt/api/tems/institution"
file = "./institution.xml"

root = ET.parse(file)

for institution in root.findall(".//ModelInstitution"):
    id = institution.find("Id").text
    name = institution.find("Name").text

    print(f"ID: {id}")
    print(f"Name: {name}")

    # if institution.find("Description") is not None:
    #     description = institution.find("Description").text
    #     print(f"Description: {description}")

    # print("")
