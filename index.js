const dateOfBirthInput = document.querySelector("#birthdate");
const showButton = document.querySelector("button");
const output = document.querySelector("#output");

function isPalindrome (string) {
    const reversedString = string.split("").reverse().join("");

    return reversedString === string;
}

function getBirthdayInAllDateFormats (dateObject) {
    let { day, month, year } = dateObject;

    // Padding 0s.
    day = String(day).padStart(2, '0');
    month = String(dateObject.month).padStart(2, '0');
    year = String(dateObject.year);

    const ddmmyyyy = `${day}${month}${year}`;
    const mmddyyyy = `${month}${day}${year}`;
    const yyyymmdd = `${year}${month}${day}`;
    const mmddyy = `${month}${day}${year.slice(-2)}`;
    const yymmdd = `${year.slice(-2)}${month}${day}`

    return [ddmmyyyy, mmddyyyy, yyyymmdd, mmddyy, yymmdd];
}

function checkIfBirthdayIsPalindromeForAllDateFormats (dateObject) {
    return getBirthdayInAllDateFormats(dateObject).some(isPalindrome)
}

function getNextDate (dateObject) {
    let dateString = `${dateObject.year}-${dateObject.month}-${dateObject.day}`;
    let currentDateNativeObject = new Date(dateString);
    let nextDateNativeDateObject = new Date(currentDateNativeObject);
    
    nextDateNativeDateObject.setDate(currentDateNativeObject.getDate() + 1);

    return {
        day: nextDateNativeDateObject.getDate(),
        month: nextDateNativeDateObject.getMonth() + 1, // First month is 0
        year:  nextDateNativeDateObject.getFullYear()
    };
}

function getNextPalindromeDate (dateObject) {
    let iterations = 0;
    let nextDate = getNextDate(dateObject);

    while (1) {
        iterations++;
        
        if (checkIfBirthdayIsPalindromeForAllDateFormats(nextDate)) { break; }

        nextDate = getNextDate(nextDate);
    }

    return { 
        iterations, 
        nextDate 
    };
}

showButton.addEventListener('click', () => {
    const birthdayString = dateOfBirthInput.value;

    if (!birthdayString) { return; }

    const [yyyy, mm, dd] = birthdayString.split('-');
    const dateObject = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
    };

    if (checkIfBirthdayIsPalindromeForAllDateFormats(dateObject)) {
        output.innerText = "Your birthday is palindrome. 🎉";

        return;
    }

    const { iterations: numberOfDaysRemaining, nextDate } = getNextPalindromeDate(dateObject);

    output.innerHTML = `Your birthday is not palindrome. You missed the next palindrome date <strong>${nextDate.day}-${nextDate.month}-${nextDate.year}</strong> by ${numberOfDaysRemaining} days`;
});