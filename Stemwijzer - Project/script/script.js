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
const buttonPanel = document.querySelector(".button-panel");

var num = 0;
var eensScore = 0;
var oneensScore = 0;

var buttons = document.querySelectorAll("button");
buttons[4].onclick = initialize;

for (let i = 0; i < 3; i++) {
    buttons[i].addEventListener("click", () => {
        bttnControll(i);
    })
}

function generateQuestions (count) {
    return subjects[count].statement;
}

function generateTitle (count) {
    return subjects[count].title;
}

function initialize () {
    buttons[3].style.display = "inline";
    buttonPanel.style.display = "block";

    for (let i = 0; i < 3; i++) {
        buttons[i].style.backgroundColor = null;
        buttons[i].style.color = "black";
    }

    if (num == subjects.length) {
        endFunc();
    } else {
        let question = new Question(num, generateTitle(num), generateQuestions(num));

        countEl.innerHTML = "Vraag " + question.count;
        titleEl.innerHTML = question.title;
        textEl.innerHTML = question.text;

        buttons[4].innerHTML = "Next";
        num++;
    }   
}

function endFunc () {
    countEl.innerHTML = " ";
    titleEl.innerHTML = "END";
    textEl.innerHTML = " ";
    buttons[4].innerHTML = "Refresh";

    buttons[4].onclick = () => {
        window.location.reload();
    }
}

function bttnControll (num) {
    let scoreBool = [false, false, false];

    buttons[0].style.color = "white";
    buttons[1].style.color = "white";
    buttons[2].style.color = "white";

    if (num == 0) {
        buttons[0].style.backgroundColor = "blue";
        buttons[1].style.backgroundColor = "red";
        buttons[2].style.backgroundColor = "red";

        scoreBool[num] = scoreBool[num] ? false : true;
    } else if (num == 1) {
        buttons[0].style.backgroundColor = "red";
        buttons[1].style.backgroundColor = "blue";
        buttons[2].style.backgroundColor = "red";

        scoreBool[num] = scoreBool[num] ? false : true;
    } else if (num == 2) {
        buttons[0].style.backgroundColor = "red";
        buttons[1].style.backgroundColor = "red";
        buttons[2].style.backgroundColor = "blue";

        scoreBool[num] = scoreBool[num] ? false : true;
    }
}