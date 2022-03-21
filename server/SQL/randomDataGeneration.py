import os # need so we can get os paths
import math # math package so I don't have to
import random # random number generation
import datetime # used for the weeks table
# fetching data from API
import requests as fetch # http requests
import json # converting the returned response into JSON

# variables for you to change how much data is generated
AMOUNT_OF_USERS = 3000 # Change this to alter the amount of users you want
AMOUNT_OF_VOLUNTEERS = math.floor(AMOUNT_OF_USERS / 3) # will always be 30% of volunteers to users
COHORTS_PER_REGION = 3 # for each region will make this many cohorts
REGIONS = ["West Midlands", "Scotland", "London", "North West", "Rome", "Cape Town"]
MODULES = {'Intro to Digital': 1, 'Fundamentals': 3, 'Induction and Git': 1, 'HTML/CSS': 4, 'Building a team': 1, 'JavaScript Core 1': 4, 'Communicating in the workplace': 1, 'JavaScript Core 2': 4, 'Presentation Skills': 1, 'JavaScript Core 3': 4, 'Specialization': 1, 'React': 4, 'Preparing for the Job Market': 1, 'Node.js': 3, 'Interview Skills': 1, 'Databases': 4, 'Working in Teams': 1, 'Final Projects': 4, 'Presentations and Demo Day': 1} # dictionary for each module. Key = module name, value = total weeks that module takes.
START_WEEK = datetime.date(2022, 4, 2) # Should be the first week the course starts. > YEAR, MONTH, DAY

path = os.path.join('./server/SQL/data') # directory for all the SQL files

# getting random names from an API
response = fetch.get(f"http://names.drycodes.com/{AMOUNT_OF_USERS}?nameOptions=starwarsFirstNames") 
data = json.loads(response.text) # getting the data from that fetch

# function to make my life easier
def make_file (table):
  """
  args:
    table : <string> - the name of the table you are generating data for

  Makes a new SQL file based on the variables at the top of this script and populates it with random data
  """
  file = open(f"{path}/{table}.sql", "w") # open the file we want to edit


  # match...case statement so we know what file to change. This is based on the table paramater
  match table:
    case "users":
      file.write(f"INSERT INTO {table} (first_name, last_name, pass_hash, user_name, is_volunteer, cohort_id) \nVALUES \n") # Write the INSERT INTO statement 
      # the + 1 is so we can get to the number we want and not one before
      for i in range(1, AMOUNT_OF_USERS + 1):
        [first_name, last_name] = data[i - 1].split("_") # getting first and last names seperated
        is_volunteer = False

        if (i <= AMOUNT_OF_VOLUNTEERS): is_volunteer = True # 30% of people will be volunteers

        # every password is "password" just to make life easier 
        # inserting data into the SQL file
        file.write(f"('{first_name}', '{last_name}', '{'$2b$10$cFIl9HeKhXaTMxPyRWOhAuXqrDz95GuTRFQ7ZND5ljXmU2A/Yx9Fe'}','{first_name + last_name}', {is_volunteer}, {random.randint(1, len(REGIONS) * COHORTS_PER_REGION)}){';' if i == AMOUNT_OF_USERS else ','} \n")

    case "cohorts":
      file.write(f"INSERT INTO {table} (number, region_id) \nVALUES \n") # Write the INSERT INTO statement 
      
      length = len(REGIONS)
      # for each region make N amount of cohorts. (N = COHORTS_PER_REGION)
      for region in range(1, length + 1): 
        for i in range(1, COHORTS_PER_REGION + 1):
          file.write(f"({i}, {region}){';' if region == length and i == COHORTS_PER_REGION else ','} \n")


    case "weeks":
      next_week = START_WEEK
      index = 0
      file.write(f"INSERT INTO {table} (week_date, start_time, end_time, module_id) \nVALUES \n")

      # looping through each key/value in the dict to add that many weeks to the file
      for key in MODULES:
        index += 1
        for i in range(1, MODULES[key] + 1):
          file.write(f"('{next_week}', '10:00 AM', '04:00 PM', {index}){';' if key == 'Presentations and Demo Day' else ','} \n")
          next_week = next_week + datetime.timedelta(days = 7)

  file.close() # close the file

make_file("users") # setting up the users.sql file
make_file("cohorts") # setting up the cohorts.sql file
make_file("weeks") # setting up the modules.sql file
