import csv # importing the csv package so we can read/write to it
import os # need so we can get os paths
import math
import random
# fetching data from API
import requests as fetch
import json
# generating password hashes

AMOUNT_OF_USERS = 10000 # Change this to alter the amount of rows you want
AMOUNT_OF_VOLUNTEERS = math.floor(AMOUNT_OF_USERS / 3) # will always be 30% of volunteers to users
CLASSES_PER_REGION = 3
REGIONS = ["West Midlands", "Scotland", "London", "North West", "Rome", "Cape Town"]

path = os.path.join('./server/SQL/data')

response = fetch.get(f"http://names.drycodes.com/{AMOUNT_OF_USERS}?nameOptions=starwarsFirstNames") # getting random names from an API
data = json.loads(response.text) # getting the data from that fetch

# lists relevent to each table. The elements in the lists are each column in the table
users_table = ["first-name", "last-name", "pass-hash", "user-name", "is_volunteer", "cohort_id"]
cohorts_table = ["number", "region_id"]

# function to make my life easier
def make_file (table, param):
  """
  args:
    table : string. - what table to access
    param : dictionary. - { file: csv file name, table: list variable from above }

  Makes a new CSV file based on the variables at the top of this script and populates it with random data
  """
  file = open(path + "/" + param["file"] + ".csv", "w")
  writer = csv.writer(file)
  writer.writerow(param["table"])

  match table:
    case "users":
      # the + 1 is so we can get to the number above and not one before
      for i in range(1, AMOUNT_OF_USERS + 1):
        [first_name, last_name] = data[i - 1].split("_")
        is_volunteer = False

        # row data 
        if (i <= AMOUNT_OF_VOLUNTEERS): is_volunteer = True 

        # every password is "password"
        writer.writerow([first_name, last_name, "$2b$10$cFIl9HeKhXaTMxPyRWOhAuXqrDz95GuTRFQ7ZND5ljXmU2A/Yx9Fe", first_name + last_name, is_volunteer, random.randint(1, len(REGIONS) * CLASSES_PER_REGION)])
      return
    case "cohorts":
      for region in range(1, len(REGIONS) + 1): 
        for i in range(1, CLASSES_PER_REGION + 1):
          writer.writerow([i, region])

  file.close() # close the file


make_file("users", {"file": "users", "table": users_table})
make_file("cohorts", {"file": "cohorts", "table": cohorts_table})
