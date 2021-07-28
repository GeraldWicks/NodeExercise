### Node Challenge
Name: Gerald


### Modules:
fs : File System -> Enable to read and write
csv-parser : CSV -> Parser


### Constants:
csvFilepath : stores the csv file Path.
jsonFilepath : stores the json file path (where will be stored) 
csvData : It is the array where is stored all information from the csv file
groupNumbers : Stores the positions of the group tags
groupStrings : Stores all the group informations in a array of strings


### Functions / Code
The first fs.createReadStream, has the main purpose of record all the content inside the group tags,
inside the first loop it record where is the positions of the group tags, and the second loop has the
purpose of record all the group content in a array of string. 
*The beginning of the code it is a little messy beacause I could not put it in a function.

   # function storeCsvFileTocsvData
   -> It edit the Data properly
   -> Check if has some equal eid
   -> Save the csvDta into a json file

   # function editData
   Loop through all the csvData, and throuch all the tags
   Check if is equal to: 'invisible', 'see_all', 'email', 'phone', 'group' or if is empty ''
   Edit each value properly

   # function setTrueOrFalse
   This function has the purpose to set 'see_all' and 'invisible' properly, returning true of false, depending on the input

   # function validateEmail
   Check if is a valid email, if is, return the own email if is not, return ''

   # function checkPhone
   It takes the phone's strings, transform it to only numbers, check if has 11 numbers (according to brazillian pattern ),
   and if has 11 numbers, add the 55, that is the numbers from brazil

   # function setGroup
   It takes the string group and break it into elements and throw these elements into an array. At the end of the function
   it checks if has some duplicated in the array, if has, then the function delete the duplicated item.


### Setting up to run the application
Install node (My Node Version: 14.17.2)
Run in the terminal: npm init -y
Run in the terminal: npm i csv-parser 
Be sure that you have a 'input.csv' in the same folder
If your '.csv' has a different name, please change the "const csvFilepath" to the correct path
Run in you terminal: node index.js

* I installed others libraries, but I did not use them