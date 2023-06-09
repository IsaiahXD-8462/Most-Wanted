/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        case "test":

            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `ID: ${person.id}\n`;
    personInfo += `Gender: ${person.gender}\n`
    personInfo += `DOB: ${person.dob}\n`
    personInfo += `Height: ${person.height}\n`
    personInfo += `Weight: ${person.weight}\n`
    personInfo += `Eye Color: ${person.eyeColor}\n`
    personInfo += `Occupation: ${person.occupation}\n`
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
function findPersonFamily(person, people){
    findSpouse(person, people)
    findParents(person, people)
    findSiblings(person, people)
    findPersonDescendants(person, people)
}

function findSpouse(person0, people){
    let foundspouse = people.filter(function(person){
        if (person0.currentSpouse === person.id){
            return true;
        }
    });
    displayPeople(foundspouse);
}

function findParents(person0, people){
    let foundparents = people.filter(function(person){
        if(person0.parents === person.id){
            return true
        }
    });
    displayPeople(foundparents)
}

function findSiblings(person0, people){
    let foundsiblings = people.filter(function(person){
        if(person0.parents === person.parents){
            return true
        }
    });
    displayPeople(foundsiblings)
}

function findPersonDescendants(person0, people){
    let foundDecendants = people.filter(function(person){
        if(person0.id.includes(person.parents)){
            return true
        }
    });
    displayPeople(foundDecendants)

    //let subpeople = person.descendants;
    //people = [person]
    //if (subpeople.length === 0) {
        //return 
    //}
    //for (let i = 0; i < subpeople.length; i++){
        //people = people.concat(
            //findPersonDescendants(subpeople[i])
        //);
    //}
    //return people
}

function searchByTraits(people){
    let userIsHappy = true
    let peopleList = people

    while (userIsHappy == true) {
        let foundtrait = promptFor("Which trait would you like to search: gender, date of birth, height, weight, eye color, occupation or enter finish when completed?", chars).toLowerCase();
        // if found

        switch(foundtrait){
            case "gender":
                peopleList = filterByGender(peopleList);
                displayPeople(peopleList);
                break;
            case "date of birth":
                peopleList = filterByDateOfBirth(peopleList);
                displayPeople(peopleList);
                break;
            case "height":
                peopleList = filterByHeight(peopleList);
                displayPeople(peopleList);
                break;
            case "weight":
                peopleList = filterByWeight(peopleList);
                displayPeople(peopleList);
                break;
            case "eye color":
                peopleList = filterByEyeColor(peopleList);
                displayPeople(peopleList);
                break;
            case "occupation":
                peopleList = filterByOccupation(peopleList);
                displayPeople(peopleList);
                break;
            case "finish":
                userIsHappy = false
                break
        }
}}

function filterByGender(people){
    let userInput = prompt("Enter the gender you want to search for")
    let foundPeople = people.filter(function(person){
       if(person.gender === userInput){
        return true
       } 
    })
    return foundPeople
}

function filterByDateOfBirth(people){
    let userInput = prompt("Enter the date of birth you want to search for")
    let foundPeople = people.filter(function(person){
       if(person.dob = userInput){
        return true
       } 
    })
    return foundPeople
}

function filterByHeight(people){
    let userInput = prompt("Enter the height you want to search for")
    let foundPeople = people.filter(function(person){
       if(person.weight == userInput){
        return true
       } 
    })
    return foundPeople
}

function filterByWeight(people){
    let userInput = prompt("Enter the weight you want to search for")
    let foundPeople = people.filter(function(person){
       if(person.weight == userInput){
        return true
       } 
    })
    return foundPeople
}

function filterByEyeColor(people){
    let userInput = prompt("Enter the eye color you want to search for")
    let foundPeople = people.filter(function(person){
       if(person.eyeColor === userInput){
        return true
       } 
    })
    return foundPeople
}

function filterByOccupation(people){
    let userInput = prompt("Enter the occupation you want to search for")
    let foundPeople = people.filter(function(person){
       if(person.occupation === userInput){
        return true
       } 
    })
    return foundPeople
}