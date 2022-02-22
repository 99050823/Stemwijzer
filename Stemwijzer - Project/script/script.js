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
const terug = document.getElementById("terugBttn");

var num = 0;
var eensScore = 0;
var oneensScore = 0;

var buttons = document.querySelectorAll("button");
start.addEventListener("click", () => {
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
    terug.style.display = "inline";

    for (let i = 0; i < 3; i++) {
        buttons[i].style.backgroundColor = null;
        buttons[i].style.color = "black";
    }

    if (num == subjects.length) {
        endFunc();
    } else {

        getButtons();
        let question = new Question(generateTitle(num), generateQuestions(num));

        countEl.innerHTML = "Vraag " + count;
        titleEl.innerHTML = question.title;
        textEl.innerHTML = question.text;

        start.innerHTML = "Next";
        num++;
    }   
}

function endFunc () {
    countEl.innerHTML = " ";
    titleEl.innerHTML = "END";
    textEl.innerHTML = "Eens aantal = <br>Oneens aantal = "; 
    start.innerHTML = "Refresh";

    buttonPanel.style.display = "none";
    terug.style.display = "none";

    start.addEventListener("click", () => {
        window.location.reload();
    })
}

function bttnControll () {

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

function getButtons () {

    for (let i = 0; i < 3; i++) {
        buttons[i].addEventListener("click", bttnControll);
    }
}
