class Question {
    constructor(title, text) {
        this.title = title;
        this.text = text;
    }
}

const textEl = document.getElementById("text");
const countEl = document.getElementById("count");
const titleEl = document.querySelector("h3");
const buttonPanel = document.querySelector(".button-panel");

const start = document.getElementById("startBttn");  
const back = document.getElementById("terugBttn");

var num = 0;
var checkBool = [false, false, false];
var answerArr = [];

var buttons = document.querySelectorAll("button");
start.addEventListener("click", () => {
    initialize();
})

back.addEventListener("click", () => {
    num = num - 2;
    answerArr.pop();
    initialize();
})

function generateQuestions (count) {
    return subjects[count].statement;
}

function generateTitle (count) {
    return subjects[count].title;
}

function initialize () {
    var count = num + 1;

    buttons[3].style.display = "inline";
    buttonPanel.style.display = "block";

    if (num > 0) {
        back.style.display = "inline";   
    } else {
        back.style.display = "none";
    }

    for (let i = 0; i < 3; i++) {
        buttons[i].style.backgroundColor = null;
    }

    scoreCheck();

    if (num == subjects.length) {
        let arr = calculate();
        endFunc(arr);
    } else {
        getButtons();

        let question = new Question(generateTitle(num), generateQuestions(num));

        countEl.innerHTML = "Vraag " + count;
        titleEl.innerHTML = question.title;
        textEl.innerHTML = question.text;
        start.innerHTML = "Next";
        
        num++;
    }   
    checkBool = [false, false, false];
}

function endFunc (arr) {
    countEl.innerHTML = " ";
    titleEl.innerHTML = partyResult(arr);
    textEl.innerHTML = `Eens score : <br>
    Oneens score : `; 
    start.innerHTML = "Refresh";

    buttonPanel.style.display = "none";
    back.style.display = "none";

    start.addEventListener("click", () => {
        console.clear();
        window.location.reload();
    })
}

function getButtons () {
    for (let i = 0; i < 3; i++) {
        buttons[i].addEventListener("click", bttnControll);
    }
}

function bttnControll () {
    var el = document.getElementById(this.id).parentElement;
    var buttonArr = el.getElementsByTagName("button");

    for (let i = 0; i < buttonArr.length; i++) {
        if (buttonArr[i].id == this.id) {
            buttonArr[i].style.backgroundColor = "blue";

            if (this.id == "oneensBttn") {
                checkBool[0] = checkBool[0] ? false : true;
            } else if (this.id == "eensBttn") {
                checkBool[2] = checkBool[2] ? false : true;
            } else {
                checkBool[1] = checkBool[1] ? false : true;
            }
        } else {
            buttonArr[i].style.backgroundColor = "red";
        }
    }
}

function scoreCheck () {
    if (checkBool[0] == true) {
        // Oneens Score
        answerArr.push("Oneens");
    } else if (checkBool[2] == true) {
        // Eens Score
        answerArr.push("Eens");
    } else if (checkBool[1]){
        // Neutraal
        answerArr.push("Neutraal");
    }
    console.log(answerArr);
}

function partyResult (arr) {
    console.log(arr);
    let mainKey = arr['PVV'];

    for (const key in arr) {
        if (arr[key] > mainKey) {
            mainKey = arr[key];
        }
    }

    function getKeyByValue (arr, mainKey) {
        return Object.keys(arr).find(key => arr[key] === mainKey);
    }

    return getKeyByValue(arr, mainKey);
}

function calculate () {
    console.clear();
    let matchedParties = {};

    for (let a = 0; a < parties.length; a++) {
        let key = parties[a].name;
        matchedParties[key] = 0;
    }

    for (let i = 0; i < answerArr.length; i++) { 
        if (answerArr[i] == "Eens") {
            let count = subjects[i].parties.length;

            for (let j = 0; j < count; j++) {
                if (subjects[i].parties[j].position == "pro") {
                    let party = subjects[i].parties[j].name;
                    matchedParties[party]++;
                }   
            }
        }
    }

    return matchedParties;
}