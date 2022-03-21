import os # need so we can get os paths
import math # math package so I don't have to
import random # random number generation
# fetching data from API
import requests as fetch # http requests
import json # converting the returned response into JSON

# variables for you to change how much data is generated
AMOUNT_OF_USERS = 10000 # Change this to alter the amount of rows you want
AMOUNT_OF_VOLUNTEERS = math.floor(AMOUNT_OF_USERS / 3) # will always be 30% of volunteers to users
COHORTS_PER_REGION = 3 # for each region will make this many cohorts
REGIONS = ["West Midlands", "Scotland", "London", "North West", "Rome", "Cape Town"]

path = os.path.join('./server/SQL/data') # directory for all the SQL files

# getting random names from an API
response = fetch.get(f"http://names.drycodes.com/{AMOUNT_OF_USERS}?nameOptions=starwarsFirstNames") 
data = json.loads(response.text) # getting the data from that fetch

# function to make my life easier
def make_file (table, columns):
  """
  args:
    table : <string> - the name of the table you are generating data for
    column : <list> - The name of each column in the table

  Makes a new SQL file based on the variables at the top of this script and populates it with random data
  """
  file = open(f"{path}/{table}.sql", "w") # open the file we want to edit
  file.write(f"INSERT INTO {table} ({columns}) \nVALUES \n") # Write the INSERT INTO statement 


  # match...case statement so we know what file to change. This is based on the table paramater
  match table:
    case "users":
      # the + 1 is so we can get to the number above and not one before
      for i in range(1, AMOUNT_OF_USERS + 1):
        [first_name, last_name] = data[i - 1].split("_") # getting first and last names seperated
        is_volunteer = False

        # row data 
        if (i <= AMOUNT_OF_VOLUNTEERS): is_volunteer = True # 30% of people will be volunteers

        # every password is "password" just to make life easier 
        # inserting data into the SQL file
        file.write(f"('{first_name}', '{last_name}', '{'$2b$10$cFIl9HeKhXaTMxPyRWOhAuXqrDz95GuTRFQ7ZND5ljXmU2A/Yx9Fe'}','{first_name + last_name}', {is_volunteer}, {random.randint(1, len(REGIONS) * COHORTS_PER_REGION)}){';' if i == AMOUNT_OF_USERS else ','} \n")

    case "cohorts":
      length = len(REGIONS)
      # for each region make N amount of cohorts. (N = COHORTS_PER_REGION)
      for region in range(1, length + 1): 
        for i in range(1, COHORTS_PER_REGION + 1):
          print(region, i)
          file.write(f"({i}, {region}){';' if region == length and i == COHORTS_PER_REGION else ','} \n")

  file.close() # close the file


# lists relevent to each table. The elements in the lists are each column in the table
users_columns = ["first-name", "last-name", "pass-hash", "user-name", "is_volunteer", "cohort_id"]
cohorts_columns = ["number", "region_id"]

make_file("users", users_columns) # setting up the users.sql file
make_file("cohorts", cohorts_columns) # setting up the cohorts.sql file