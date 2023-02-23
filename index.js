let questionBank =[
    {
        question: "Javascript is an _______ language?",
        option1: "Object oriented",
        option2: "Object based",
        option3: "Procedural",
        option4: "None of the above",
        result: ["Object oriented"]
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        option1: "var",
        option2: "let",
        option3: "Both A and B",
        option4: "None of the above",
        result: ["Both A and B"]
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        option1: "const",
        option2: "let",
        option3: "var",
        option4: "constant",
        result: ["const"]
    },
    {
        question: 'The "function" and " var" are known as:',
        option1: "Data types",
        option2: "Keywords",
        option3: "Declaration statements",
        option4: "Prototypes",
        result: ["Keywords"]
    },
    {
        question: "Which of these is not a keyword?",
        option1: "debugger",
        option2: "use strict",
        option3: "with",
        option4: "if",
        result: ["use strict"]
    },
    {
        question: "Which of the following is an advantage of using JavaScript?",
        option1: "Less server interaction",
        option2: "Immediate feedback to visitors",
        option3: "Increased interactivity",
        option4: "All of the above",
        result: ["All of the above"]
    },
    {
        question: "Which of the following function of String object returns the calling string value converted to upper case while respecting the current locale?",
        option1: "toLocaleUpperCase()",
        option2: "toUpperCase()",
        option3: "toString()",
        option4: "substring()",
        result:[ "toLocaleUpperCase()"]
    },
    {
        question: "Which of the following function of Array object calls a function for each element in the array",
        option1: "concat()",
        option2: "every()",
        option3: "filter()",
        option4: "forEach()",
        result: ["forEach()"]
    },
    {
        question: "Which of the following is not an error in JavaScript?",
        option1: "Missing of Bracket",
        option2: "Division by zero",
        option3: "Syntax error",
        option4: "Missing of semicolons",
        result: ["Division by zero"]
    },
    {
        question: "Which of the following is not a framework?",
        option1: "JavaScript.NET",
        option2: "JavaScript",
        option3: "Cocoa JS",
        option4: "jQuery",
        result: ["JavaScript"]
    }
]

let q = document.getElementsByClassName("questionTitle")[0];
let [a, b, c, d] = document.getElementsByClassName("answer-text");
let btn = document.getElementById("_btn");
let questionId=0;

let storedAnswers=0;

window.addEventListener("load",function(){
    btn.setAttribute("class","submit-button");
    //call set question and set button event listener
    // let x = localStorage.getItem("QNumber");
    // if(x==null)
    setQuestion(0);
    // else
    // setQuestion(x);
    btn.addEventListener("click",calculateAnswer);
});

function setQuestion(questionNumber){
    questionId=questionNumber;
    q.innerHTML=questionBank[questionNumber].question;
    a.innerHTML=questionBank[questionNumber].option1;
    a.style.color="grey";
    b.innerHTML=questionBank[questionNumber].option2;
    b.style.color="grey";
    c.innerHTML=questionBank[questionNumber].option3;
    c.style.color="grey";
    d.innerHTML=questionBank[questionNumber].option4;
    d.style.color="grey";
    document.getElementById("cb1").checked=false;
    document.getElementById("cb2").checked=false;
    document.getElementById("cb3").checked=false;
    document.getElementById("cb4").checked=false;
}

function calculateAnswer(){
    let selectedOptions = [];
    let element;
    if(document.getElementById("cb1").checked) selectedOptions.push(a.innerHTML);
    if(document.getElementById("cb2").checked) selectedOptions.push(b.innerHTML);
    if(document.getElementById("cb3").checked) selectedOptions.push(c.innerHTML);
    if(document.getElementById("cb4").checked) selectedOptions.push(d.innerHTML);
    if(selectedOptions.length == 0){
        document.getElementById("status").innerHTML="Please choose at lesst one option!";
        return;
    } 
    document.getElementById("status").innerHTML="";
    let flag=false;
    let realResult="";
    let userResult="";
    for(let i=0; i<selectedOptions.length; i++){
        switch(selectedOptions[i]){
            case a.innerHTML: element=a; break;
            case b.innerHTML: element=b; break;
            case c.innerHTML: element=c; break;
            case d.innerHTML: element=d; break;
        }
        flag=false;
        for(let j=0; j<questionBank[questionId].result.length; j++){
            if(questionBank[questionId].result[j]==selectedOptions[i]) flag=true;
        }
        if(flag) displayGreen(element); 
        else displayRed(element);
        userResult+=selectedOptions[i];
    }
    for(let j=0; j<questionBank[questionId].result.length; j++){
        realResult+=questionBank[questionId].result[j];
    }
    if(userResult==realResult) storedAnswers++;
    btn.removeEventListener("click",calculateAnswer);
    if(questionId<questionBank.length-1){
        btn.innerHTML="Next";
        btn.setAttribute("class","next-button");
        btn.addEventListener("click",nextFunction)
    }
    else{
        btn.innerHTML="Show Result";
        btn.style.backgroundColor="oragne"
        btn.addEventListener("click",showResult);
    }
}
function nextFunction(){
    hideCorrect();
    btn.removeEventListener("click",nextFunction);
    goToNextQuestion(questionId+1);
    btn.addEventListener("click",calculateAnswer);
}
function goToNextQuestion(questionNumber){
    btn.innerHTML="Submit";
    btn.setAttribute("class","submit-button");
    setQuestion(questionNumber);
}
function createResultString(number){
    let x = questionBank[number].result;
    let ans ="Answer : " + x[0];
    for(let i=1; i<x.length; i++){
        ans+= ", "+x[i];
    }
    return ans;
}
function showCorrect(){
    document.getElementById("status").innerHTML=createResultString(questionId);
    showButton.removeEventListener("click",showCorrect);
    showButton.innerHTML="Hide Answer";
    showButton.addEventListener("click",hideCorrect);
}

function hideCorrect(){
    document.getElementById("status").innerHTML="";
    showButton.removeEventListener("click",hideCorrect);
    showButton.innerHTML="Show Answer";
    showButton.addEventListener("click",showCorrect);
}
function skipQuestion(){
    hideCorrect();
    if(questionId<questionBank.length-1){
        btn.removeEventListener("click",nextFunction);
        btn.removeEventListener("click",calculateAnswer);
        btn.innerHTML="Submit";
        btn.addEventListener("click",calculateAnswer);
        btn.setAttribute("class","submit-button");
        setQuestion(questionId+1);
    }
    else{
        document.getElementById("status").innerHTML="No More Questions!";
        btn.removeEventListener("click",nextFunction);
        btn.removeEventListener("click",calculateAnswer);
        btn.innerHTML="Show Result";
        btn.style.backgroundColor="oragne"
        btn.addEventListener("click",showResult);
    }
}
function showResult(){
    let l=document.getElementById("_btn")
    let m=document.getElementById("_showbtn");
    let n=document.getElementById("_skipbtn");
    let x = document.getElementById("Q");
    let y = document.getElementById("O");
    let z = document.getElementById("status");
    l.parentNode.removeChild(l);
    m.parentNode.removeChild(m);
    n.parentNode.removeChild(n);
    x.parentNode.removeChild(x);
    y.parentNode.removeChild(y);
    z.parentNode.removeChild(z);

    let whiteboard = document.getElementById("whiteboard");
    let yourScore = document.createElement("h2");
    yourScore.innerHTML = "Your score: " + storedAnswers +" out of " + questionBank.length;
    whiteboard.appendChild(yourScore);
    for(let p=0; p<questionBank.length; p++){
        let temp=document.createElement("p");
        temp.innerHTML=questionBank[p].question;
        let temp_ans=document.createElement("span");
        temp_ans.style.backgroundColor="lightgreen";
        temp_ans.innerHTML=createResultString(p);
        temp.appendChild(temp_ans);
        whiteboard.appendChild(temp);
    }
    let temp_btn = document.createElement("button");
    whiteboard.appendChild(temp_btn);
    btn=temp_btn;
    btn.removeEventListener("click",showResult);
    btn.innerHTML="Restart";
    btn.setAttribute("class","submit-button");
    btn.style.backgroundColor="green";
    btn.style.backgroundColor="lightblue";
    btn.addEventListener("click",function(){
        history.go(0);
    });
}

function displayGreen(element){
    element.style.color="green";
}

function displayRed(element){
    showCorrect();
    element.style.color="red";
}

let showButton = document.getElementById("_showbtn");
showButton.addEventListener("click", showCorrect);

let skipButton = document.getElementById("_skipbtn");;
skipButton.addEventListener("click", skipQuestion);