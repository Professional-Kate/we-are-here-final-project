import os # need so we can get os paths
import math # math package so I don't have to
import random # random number generation
import datetime # used for the weeks table
# fetching data from API
import requests as fetch # http requests
import json # converting the returned response into JSON

# variables for you to change how much data is generated
TRAINEES_PER_CLASS = 30 # Change this to alter the amount of trainees you want per class
VOLUNTEERS_PER_CLASS = 3 # change this to alter the amount of volunteers you want per class
COHORTS_PER_REGION = 3 # for each region will make this many cohorts
REGIONS = ["West Midlands", "Scotland", "London", "North West", "Rome", "Cape Town"]
AMOUNT_OF_REGIONS = len(REGIONS)
MODULES = {'Intro to Digital': 1, 'Fundamentals': 3, 'Induction and Git': 1, 'HTML/CSS': 4, 'Building a team': 1, 'JavaScript Core 1': 4, 'Communicating in the workplace': 1, 'JavaScript Core 2': 4, 'Presentation Skills': 1, 'JavaScript Core 3': 4, 'Specialization': 1, 'React': 4, 'Preparing for the Job Market': 1, 'Node.js': 3, 'Interview Skills': 1, 'Databases': 4, 'Working in Teams': 1, 'Final Projects': 4, 'Presentations and Demo Day': 1} # dictionary for each module. Key = module name, value = total weeks that module takes.
START_WEEK = datetime.date(2022, 4, 2) # Should be the first week the course starts. format > YEAR, MONTH, DAY . All ints

path = os.path.join('./server/SQL/data') # directory for all the SQL files

# getting random names from an API
response = fetch.get(f"http://names.drycodes.com/{TRAINEES_PER_CLASS * (COHORTS_PER_REGION * AMOUNT_OF_REGIONS)}?nameOptions=starwarsFirstNames") 
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
      # how we keep track of how many users we've generated
      usernames = [] # used to check if the username exists
      current_cohort_number = 1 # used to track the current cohort number
      current_volunteers = 0 # used to check how many volunteers we've added per cohort

      file.write(f"INSERT INTO {table} (first_name, last_name, pass_hash, user_name, is_volunteer, cohort_id) \nVALUES \n") # Write the INSERT INTO statement 
      # the + 1 is so we can get to the number we want and not one before
      for i in range(1, TRAINEES_PER_CLASS * (COHORTS_PER_REGION * AMOUNT_OF_REGIONS)):
        is_volunteer = False
        [first_name, last_name] = data[i - 1].split("_") # getting first and last names seperated
        username = first_name + last_name # used to make sure we don't add duplicate usernames

        # checking if the username exists, if it does then add on a random int
        if username in usernames:
          print("duplicate username detected, replacing")
          username += str(random.randint(0, 1000000))

        usernames.append(username)

        # every N users run this block. N = TRAINEES_PER_CLASS
        if (i % TRAINEES_PER_CLASS == 0): 
          current_cohort_number += 1
          current_volunteers = 0
        # checking if our local amount of volunteers = the global amount of volunteers
        if (current_volunteers != VOLUNTEERS_PER_CLASS):
          is_volunteer = True
          current_volunteers += 1
          

        # every password is "password" just to make life easier 
        # inserting data into the SQL file
        file.write(f"('{first_name}', '{last_name}', '{'$2b$10$cFIl9HeKhXaTMxPyRWOhAuXqrDz95GuTRFQ7ZND5ljXmU2A/Yx9Fe'}','{username}', {is_volunteer}, {current_cohort_number}){';' if i == TRAINEES_PER_CLASS * (COHORTS_PER_REGION * AMOUNT_OF_REGIONS) - 1 else ','} \n")

    case "cohorts":
      file.write(f"INSERT INTO {table} (number, region_id) \nVALUES \n") # Write the INSERT INTO statement 
      
      length = len(REGIONS)
      # for each region make N amount of cohorts. (N = COHORTS_PER_REGION)
      for region in range(1, length + 1): 
        for i in range(1, COHORTS_PER_REGION + 1):
          file.write(f"({i}, {region}){';' if region == length and i == COHORTS_PER_REGION else ','} \n")


    case "weeks":
      next_week = START_WEEK # have this copied so we don't mutate START_WEEK
      index = 0 # variable to keep track of each different module we insert 
      file.write(f"INSERT INTO {table} (week_date, start_time, end_time, module_id) \nVALUES \n")

      # looping through each key/value in the dict to add that many weeks to the file
      for key in MODULES:
        index += 1 # for every module increase index by one
        for i in range(1, MODULES[key] + 1):
          file.write(f"('{next_week}', '10:00 AM', '04:00 PM', {index}){';' if key == 'Presentations and Demo Day' else ','} \n")
          next_week = next_week + datetime.timedelta(days = 7) # make a new date object based on the current week + 7 days

  file.close() # close the file

make_file("users") # setting up the users.sql file
make_file("cohorts") # setting up the cohorts.sql file
make_file("weeks") # setting up the modules.sql file
