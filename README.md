### Node Challenge
Name: Gerald
<br/>
<br/>

### Modules:
fs : File System -> Enable to read and write<br/>
csv-parser : CSV -> Parser<br/>


### Constants:
csvFilepath : stores the csv file Path<br/>
jsonFilepath : stores the json file path (where will be stored) <br/>
csvData : It is the array where is stored all information from the csv file<br/>
groupNumbers : Stores the positions of the group tags<br/>
groupStrings : Stores all the group informations in a array of strings<br/>


### Functions / Code
The first fs.createReadStream, has the main purpose of record all the content inside the group tags,<br/>
inside the first loop it record where is the positions of the group tags, and the second loop has the<br/>
purpose of record all the group content in a array of string.<br/> 
*The beginning of the code it is a little messy beacause I could not put it in a function.<br/>

   # function storeCsvFileTocsvData
   -> It edit the Data properly<br/>
   -> Check if has some equal eid<br/>
   -> Save the csvDta into a json file<br/>

   # function editData
   Loop through all the csvData, and throuch all the tags<br/>
   Check if is equal to: 'invisible', 'see_all', 'email', 'phone', 'group' or if is empty ''<br/>
   Edit each value properly<br/>

   # function setTrueOrFalse
   This function has the purpose to set 'see_all' and 'invisible' properly, returning true of false, depending on the input<br/>

   # function validateEmail
   Check if is a valid email, if is, return the own email if is not, return ''<br/>

   # function checkPhone
   It takes the phone's strings, transform it to only numbers, check if has 11 numbers (according to brazillian pattern ),<br/>
   and if has 11 numbers, add the 55, that is the numbers from brazil<br/>

   # function setGroup
   It takes the string group and break it into elements and throw these elements into an array. At the end of the function<br/>
   it checks if has some duplicated in the array, if has, then the function delete the duplicated item.<br/>


### Setting up to run the application
Install node (My Node Version: 14.17.2)<br/>
Run in the terminal: npm init -y<br/>
Run in the terminal: npm i csv-parser <br/>
Be sure that you have a 'input.csv' in the same folder<br/>
If your '.csv' has a different name, please change the "const csvFilepath" to the correct path<br/>
Run in you terminal: node index.js<br/>
<br/>
* I installed others libraries, but I did not use them