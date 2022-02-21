class Question {
    constructor(count, title, text) {
        this.count = count;
        this.title = title;
        this.text = text;
    }
}

const textEl = document.getElementById("text");
const countEl = document.getElementById("count");
const titleEl = document.querySelector("h3");

var num = 1;
var startBttn = document.querySelector("button");
startBttn.onclick = initialize;

function generateQuestions (count) {
    return subjects[count].statement;
}

function generateTitle (count) {
    return subjects[count].title;
}

function initialize () {

    if (num == subjects.length) {
        endFunc();
    } else {
        let question = new Question(num, generateTitle(num), generateQuestions(num));

        countEl.innerHTML = "Vraag " + question.count;
        titleEl.innerHTML = question.title;
        textEl.innerHTML = question.text;
        startBttn.innerHTML = "Next";
    
        num++;
    }   
}

function endFunc () {
    countEl.innerHTML = " ";
    titleEl.innerHTML = "END";
    textEl.innerHTML = " ";
    startBttn.innerHTML = "END";

    num = 1;
}