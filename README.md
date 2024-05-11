# Code Summarization and Evaluation Tool (CSET)



## Team Members:
1. Aarthi Nunna - [﻿anunna@umass.edu](mailto:anunna@umass.edu)  - **Spire ID:** 34042804
2. Ashwini Ramesh Kumar - [﻿ashwinirames@umass.edu](mailto:ashwinirames@umass.edu)  -  **Spire ID:** 34025576
3. Dhamini Devaraj - [﻿ddevaraj@umass.edu](mailto:ddevaraj@umass.edu)  - **Spire ID:** 34048503
4. Janani Pasham- [﻿jpasham@umass.edu](mailto:jpasham@umass.edu)  - **Spire ID:** 34023678
5. Rashmi Vagha - [﻿rvagha@umass.edu](mailto:rvagha@umass.edu)  - **Spire ID:** 33617396
---

## Running our Code:
To run our code, please perform the following steps:

1. First clone our repository into your local system.
2. Within the _**src **_directory, run the below command to launch the** front-end**: 
    1. To launch the front-end run:  (Running on Port 3000)
`npm start`  

1.  Within the main directory of the cloned repository, run the below command to launch the **back-end Flask server**: 
> **NOTE:** Before starting the Flask Server, ensure to insert you Gemini PaLM API Key! Refer to [﻿aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)  to create your API Key!

1. To launch the back-end run:  (Running on Port 5000)
`python server.py`  

1. To create the SQL database and the tables within the database, launch an **SQL server** (For eg: MySQL WorkBench) and run our: 
`DB_script.txt` 

Our application is now deployed successfully and will be able at: [﻿http://localhost:3000 ](http://localhost:3000/) 

Remember to Sign Up before you start summarizing!

---

## **Main Features of our Project:**
- Code Summarization - The summarization of a given input code is done with the help of Gemini PaLM API that receives a prompt of the form: 
> Summarise the following code. It must be natural, useful and consistent. The summary's should be in bullet points and its length must be proportional to the input code length. It must only explain the logic of the code, not the program syntax and semantics{}

- Translation - We understand that users might find it easier to understand a produced summary in their native or preferred language over English. For this purpose, we provide users with the ability to translate their summaries into their preferred language. We do so with the help of the MyMemory API. 
- User Category - We ask users to choose a category they feel most closely aligned to such as Student, AI Engineer, Business Data Analyst, etc. This information is used by the admin to view statistics averaged according to a user's category, i.e., the admin gains extra insight into the model generated summaries and an understanding of how these summaries are perceived by different types of users. 
---

## Framework:
| Application Tier | Framework Used |
| ----- | ----- |
| Front-End | ReactJS |
| Back-End | Flask |
| Database | MySQL |
---

## Large Language Models and APIs Used:
| Requirement | Model/API Used |
| ----- | ----- |
| Code Summarization | Gemini PaLM API (Requires API Key, used Free-Tier functionalities) |
| Translation | MyMemory API (Free, OpenSource API) |
---

## Certain Design Choices:
- We decided to use two different APIs or LLMs to perform the code summarization and translation as this reduces the probability of error, and allows us to user LLMs/API's that are more suited for the task of either translation or code summarization. For instance, MyMemory is meant purely for translation and is thus inclined to translate text better than Gemini PaLM which is trained on a huge dataset more suited for text generation and code summarization.
- We use PaLM API due to its ease of use, and as it can be accessed conveniently through its API as opposed to use locally running model such as Ollama, which also took a significant amount of time for generating output when prompted.
---

## Overview of Main CSET Components: 


**Authentication:**

- SignIn -
- SignUp - 
- 
**Admin Dashboard:**

- AccountSettings - The admin views their username and password. They can also change their password.
- AddAdmin - The admin has the ability to add other admins.
- ViewUserStats - The admin can view the user statistics in the following manner displayed both numerically and as a bar graph:
    - CategoryUsersEval : Admin can view the statistics of a particular category of users.
    - SingleUserEval : Admin can view the statistics of a single user.
    - AllUsersEval : Admin can view the statistics of all users averaged together.


**User Dashboard:**

- InputCode - The users can input a file of code snippets and obtain summaries for each code snippet contained in the file. They can also provide feedback for each summary generated.
- SingleCode - The users can paste a snippet of code, obtain the summary and provide feedback for the same. 
- Translator - The users can paste a summary of their choice and translate it to their desire language. 
- UserAccountSettings - the user can view their username and password. They can also change their password.
- ViewSummaries - The users can view all their previously requested code summaries and their respective feedbacks. 


---

## Testing Details:


1. Unit Testing - **Jest** 
2. Integration Testing - **Postman** 
3. Equivalence Testing - **Blackbox Testing**


**Add more details on completion of testing**







