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
var checkBool = [false, false, false];

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
    }

    scoreCheck();

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
    checkBool = [false, false, false];
}

function endFunc () {
    countEl.innerHTML = " ";
    titleEl.innerHTML = finalResult();
    textEl.innerHTML = "Eens Score: " + eensScore  + "<br>" + 
    "Oneens Score: " + oneensScore; 
    start.innerHTML = "Refresh";

    buttonPanel.style.display = "none";
    terug.style.display = "none";

    start.addEventListener("click", () => {
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
        oneensScore++;
    } else if (checkBool[2] == true) {
        eensScore++;
    }
}

function finalResult () {
    return "(Voorbeeld: VVD)";
}

