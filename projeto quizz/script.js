let currentQuestions = 0;
let correctAnswers = 0;

showQuestions();

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

function showQuestions() {
  if (questions[currentQuestions]) {
    let q = questions[currentQuestions];

    let pct = Math.floor((currentQuestions / questions.length) * 100);

    document.querySelector(".progress--bar").style.width = `${pct}%`;

    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";

    document.querySelector(".question").innerHTML = q.question;
    let optionsHtml = "";

    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`;
    }
    document.querySelector(".options").innerHTML = optionsHtml;

    document.querySelectorAll(".options .option").forEach((item) => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    FinishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute("data-op"));

  if (questions[currentQuestions].answer === clickedOption) {
    correctAnswers++;
  }

  currentQuestions++;
  showQuestions();
}

function FinishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if(points <= 30){
    document.querySelector('.scoreText1').innerHTML = 'Ruim';
    document.querySelector('.scorePct').style.color = '#FF0000'
  }else if(points => 30 && points < 70){
    document.querySelector('.scoreText1').innerHTML = 'Bom';
    document.querySelector('.scorePct').style.color = '#FFFF00'
  }else if(points => 70){
    document.querySelector('.scoreText1').innerHTML = 'Muito bom';
    document.querySelector('.scorePct').style.color = '#00d09f'
  };

  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
  document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswers}!`

  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".progress--bar").style.width = "100%";
};

function resetEvent(){
    correctAnswers = 0;
    currentQuestions = 0;
    showQuestions();
}
