const bttnPanel = document.querySelector(".button-panel");
const choiceBttns = bttnPanel.querySelectorAll("button");
const section = document.querySelector("section");
const endButtons = document.querySelector(".end-buttons");
const allSectionEl = document.querySelectorAll("section *");

const start = document.getElementById("startBttn");
const next = document.getElementById("nextBttn");
const back = document.getElementById("backBttn");
const multi = document.getElementById("multiplier");

const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");
const countEl = document.getElementById("count");

var counter = 0;
var answerArr = [];
var multiplier = false;

start.onclick = startFunc;

multi.addEventListener("click", () => {
    if (multi.style.backgroundColor !== "green") {
        multi.style.backgroundColor = "green";
    } else {
        multi.style.backgroundColor = "red";
    }
})

next.addEventListener("click", () => {
    saveAnswer(counter);
    counter++;
    questionController(counter);
})

class Question {
    constructor(title, text) {
        this.title = title 
        this.text = text
    }
}

function generateTitle (count) {
    // Returns a title for a question
    return subjects[count].title;
}

function generateText (count) {
    // Returns the question text
    return subjects[count].statement;
}

function startFunc() {
    // Configures all buttons and initializes the list
    bttnPanel.style.display = "block";
    next.style.display = "inline";
    multi.style.display = "inline";
    back.style.display = "inline";
    start.style.display = "none";
    countEl.innerHTML = "1.";

    questionController(counter);
}

function endFunc(end) {
    // Displays the highest rated party
    allSectionEl.forEach(el => {
        el.style.display = "none";
    });

    let endContainer = document.createElement("div");
    let endList = document.createElement("ul");
    let title = document.createElement("h2");

    endList.classList.add("end-list");
    title.innerHTML = "UITKOMST";

    endContainer.append(title);
    section.append(endContainer);
    endContainer.append(endList);

    for (const key in end) {
        let listEl = document.createElement("li");
        let listDiv = document.createElement("div");
        let listText = document.createElement("p");

        listDiv.innerHTML = key;
        listText.innerHTML = `Aantal overeengekomen stemmen : ${end[key]}`;
        
        listDiv.classList.add("list-item");
        listDiv.append(listText);
        listEl.append(listDiv);
        endList.append(listEl); 
    }
}

function questionController(count) {
    // Controlls questions based on a counter
    let questionNumber = count+1;

    multi.style.backgroundColor = null;
    for (let i = 0; i < 3; i++) {
        choiceBttns[i].style.backgroundColor = null;
    }

    if (count == subjects.length) {
        let endResult = calculate();
        endFunc(endResult);
    } else {
        let question = new Question(generateTitle(count), generateText(count));

        countEl.innerHTML = `${questionNumber}.`;
        titleEl.innerHTML = question.title;
        textEl.innerHTML = question.text;
    
        getButtons();
    }
}

function getButtons () {
    // Adds functionality to the choice buttons
    for (let i = 0; i < 3; i++) {
        choiceBttns[i].addEventListener("click", bttnControll);
    }
}

function bttnControll() {
    // Onclick change the buttons background color
    var el = document.getElementById(this.id).parentElement;
    var buttonArr = el.getElementsByTagName("button");

    for (let i = 0; i < buttonArr.length; i++) {
        if (buttonArr[i].id == this.id) {
            buttonArr[i].style.backgroundColor = "blue";
        } else {
            buttonArr[i].style.backgroundColor = "red";
        }
    }
}

function saveAnswer(index) {
    // Saves the answer based on the background color of the buttons
    if (choiceBttns[0].style.backgroundColor == "blue") {
        answerArr[index] = "Oneens";
    } else if(choiceBttns[1].style.backgroundColor == "blue") {
        answerArr[index] = "Neutraal"; 
    } else if(choiceBttns[2].style.backgroundColor == "blue"){
        if (multi.style.backgroundColor == "green") {
            answerArr[index] = "Eens2x";
        } else {
            answerArr[index] = "Eens";
        }
    } else {
        answerArr[index] = "<Empty>";
    }

    console.log(answerArr);
}

function calculate() {
    // Calculates the highest rated party 
    let partyScore = {};

    for (let i = 0; i < parties.length; i++) {
        let key = parties[i].name;
        partyScore[key] = 0;
    }

    for (let j = 0; j < subjects.length; j++) {
        for (let a = 0; a < subjects[j].parties.length; a++) {
            if (answerArr[j] == "Eens") {
                if (subjects[j].parties[a].position == "pro") {
                    let name = subjects[j].parties[a].name;
                    partyScore[name]++;     
                }
            } else if(answerArr[j] == "Eens2x"){
                if (subjects[j].parties[a].position == "pro") {
                    let name = subjects[j].parties[a].name;
                    partyScore[name] = partyScore[name]+2;     
                }
            }
        }    
    }

    return partyScore;
}