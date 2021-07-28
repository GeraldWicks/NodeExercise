//jshint esversion:6
// Read the README File to undestand the code better


const fs = require('fs');
const parse = require('csv-parser');


const csvFilepath = "input.csv";
const jsonFilepath = "output.json";
const csvData = [];
const groupNumbers = [];
const groupStrings = [];


// Find all group words, and store in inside groupStrings
fs.createReadStream(csvFilepath)
.pipe(parse({headers: false}))
.on('data', (data) => 
{
    //groupNumber will record where is the position of group tags
    for (const key in data) {
        if (data[key] === 'group')
        {
            groupNumbers.push(key);
        }
    }


    //Put all the group itens in a single string called newStringGroup
    var newStringGroup = "";

    for (var j = 0; j < groupNumbers.length; j++)
    {
        newStringGroup += data[groupNumbers[j]];

        if (j !== groupNumbers.length - 1 && data[groupNumbers[j + 1]] !== '')
        {
            newStringGroup += ",";            
        }
    }

    //Populate the array of strings
    groupStrings.push(newStringGroup);
}
)
.on('end', () => {
    groupStrings.shift();
    storeCsvFileTocsvData(groupStrings);
})


function storeCsvFileTocsvData(groupStrings)
{
    fs.createReadStream(csvFilepath)
    .pipe(parse({}))
    .on('data', (data) => csvData.push(data))
    .on('end', () => populateJSON(csvData, groupStrings))
}


function populateJSON(csvData, groupStrings)
{
    csvData = editData(csvData, groupStrings);
    csvData = checkEqualEid(csvData, groupStrings);
    saveJSON(jsonFilepath, csvData);
}


function editData(csvData, groupStrings)
{
    csvData.forEach((data, index) => {

        for (const key in data) {

            const keyWithoutSpace = key.slice(0, 5); //It will hold email, phone and group
            
            if (key === 'invisible' || key === 'see_all')
            {
                data[key] = setTrueOrFalse(data[key]);
            }

            if (keyWithoutSpace === 'email')
            {
                data[key] = validateEmail(data[key]);
            }

            if (keyWithoutSpace === 'phone')
            {
                data[key] = checkPhone(data[key]);
            }

            if (keyWithoutSpace === 'group')
            {
                data[key] = setGroup(groupStrings[index]);
            }

            if (`${data[key]}` === '')
            {
                delete data[key];
            }
        }
  
    });

    return csvData;
}


function checkEqualEid(csvData, groupStrings)
{
    for (var i = 0; i < csvData.length - 1; i++)
    {
        for (j = i + 1; j < csvData.length; j++)
        {
            if(csvData[i]['eid'] === csvData[j]['eid'])
            {
                csvData[i] = {...csvData[i], ...csvData[j]};
                groupStrings[i] += ',' + groupStrings[j];
                csvData[i]['group'] = setGroup(groupStrings[i]);
                csvData.splice(j, 1);
            }
        }
    }

    return csvData;
}


function saveJSON(filename = '', json = '""')
{
    return fs.writeFileSync(
        filename,
        JSON.stringify(json, null,2)
    )
}


// it sets 'invible' and 'see_all' property, it returns true or false
function setTrueOrFalse(value)
{
    if (value === "1" || value === "yes")
    {
        return 'true';
    }
    if (value === "0" || value === "no" || value === "")
    {
        return 'false';
    }
}


function validateEmail(email) 
{
    const result = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Checks if is a valid email
    if (result.test(email))
    {
        return email
    }
    else
    {
        return '';
    }
}


function checkPhone(strPhone)
{
    var completeNumber;

    // Takes only the numbers from strPhone (Phone's String)
    const phone = strPhone.replace(/\D/g, "");

    if (phone.length === 11)
    {
        completeNumber = "55" + phone;
    }
    
    if (phone.length !== 11)
    {
        completeNumber = '';
    }

    return completeNumber;
}


function setGroup(strGroup)
{
    var newGroupItem; //it will record a new value
    var newArray = []; //it will record all the values

    // startString: holds the position of the starting group element
    // endString: holds the position of the ending group element
    var startString = endString = 0;
    var needStartString = true; //it indicates if need a new Start String

    for (var j = 0; j < strGroup.length; j++)
    {
        // Checks where is the begin of a newGroupItem            
        if (strGroup[j] !== ',' && strGroup[j] !== '/' && strGroup[j] !== ' ' && needStartString === true)
        {
            startString = j;
            needStartString = false;
        }

        // Checks where is the end of a newGroupItem
        if (strGroup[j+1] === "," || strGroup[j+1] === "/" || j === strGroup.length - 1)
        {
            endString = j + 1;
            newGroupItem = strGroup.slice(startString, endString);
            newArray.push(newGroupItem);
            needStartString = true;
        }
    }


    //Check for equal groups, and delete if it is equal
    for (var i = 0; i < newArray.length; i++)
    {
        for (var j = i + 1; j < newArray.length; j++)
        {
            if(newArray[i] === newArray[j])
            {
                newArray.splice(i, 1);
            }
        }
    }

    return newArray;
}