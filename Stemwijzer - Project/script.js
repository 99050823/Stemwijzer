const bttnPanel = document.querySelector(".button-panel");
const choiceBttns = bttnPanel.querySelectorAll("button");

const start = document.getElementById("startBttn");
const next = document.getElementById("nextBttn");
const back = document.getElementById("backBttn");

const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");

var counter = 0;
var answerArr = [];

start.onclick = startFunc;

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
    return subjects[count].title;
}

function generateText (count) {
    return subjects[count].statement;
}

function startFunc() {
    bttnPanel.style.display = "block";
    next.style.display = "inline";
    back.style.display = "inline";
    start.style.display = "none";

    questionController(counter);
}

function endFunc() {
    alert("END");
}

function questionController(count) {
    for (let i = 0; i < 3; i++) {
        choiceBttns[i].style.backgroundColor = null;
    }

    if (count == subjects.length) {
        endFunc();
    } else {
        let question = new Question(generateTitle(count), generateText(count));

        titleEl.innerHTML = question.title;
        textEl.innerHTML = question.text;
    
        getButtons();
    }
}

function getButtons () {
    for (let i = 0; i < 3; i++) {
        choiceBttns[i].addEventListener("click", bttnControll);
    }
}

function bttnControll() {
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
    if (choiceBttns[0].style.backgroundColor == "blue") {
        answerArr[index] = "Eens";
    } else if(choiceBttns[1].style.backgroundColor == "blue") {
        answerArr[index] = "Neutraal"; 
    } else if(choiceBttns[2].style.backgroundColor == "blue"){
        answerArr[index] = "Oneens";
    } else {
        answerArr[index] = "<Empty>";
    }

    console.log(answerArr);
}