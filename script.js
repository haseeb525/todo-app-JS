const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");
const progressBottomLabel = document.querySelector(".quote");

const allQuotes =[
    'Raise The Bar By Completing Your Goals!',
    'Well Begun Is Half Done!',
    'Just a Step Away, keep Going!',
    'Whoa! You Just Completed All Goals For Today!',
] 

const allQuotesBottom =[
    '“Move One Step Ahead Today”',
    '“Keep Going, You’re making great progress”',
    '“Keep Going, You’re almost there”',
    '“Congratulations, You made it”',
]

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    first: {
        name: "",
        completed: false,
    },
    second: {
        name: "",
        completed: false,
    },
    third: {
        name: "",
        completed: false,
    },
};
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.style.width = `${completedGoalsCount / 3 * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];
progressBottomLabel.innerText = allQuotesBottom[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every((input) => { 
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
      progressValue.style.width = `${completedGoalsCount / 3 * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];
      progressBottomLabel.innerText = allQuotesBottom[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      errorLabel.parentElement.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    errorLabel.parentElement.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
        input.value = allGoals[input.id].name;
        return;
    }

    allGoals[input.id].name = input.value;

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
