const synonymsBtn = (arr) => {
  const htmlElements = arr.map(
    (el) => `<span class="p-2 rounded-lg bg-blue-100 ">${el}</span>`,
  );
  return htmlElements.join(" ");
};

const loadSpiner = (status) => {
  if (status == true) {
    document.getElementById("spiner").classList.remove("hidden");
    document.getElementById("whole-word-container").classList.add("hidden");
  } else {
    document.getElementById("whole-word-container").classList.remove("hidden");
    document.getElementById("spiner").classList.add("hidden");
  }
};

// loadLesson is a function to load the api of all levels and it sends the data to displayLevel funciton

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((levels) => displayLevel(levels.data));
};

// displayLevel is a function to display all the levels , there are total 7 levels.

const displayLevel = (datas) => {
  const levelContainer = document.getElementById("levels-container");
  for (const data of datas) {
    const level = document.createElement("div");
    level.innerHTML = `
    <button id="wordLoad(${data.level_no})" onclick="wordLoad(${data.level_no})" class="btn  inactive btn-primary btn-outline rounded-lg py-5 px-7">
          <img src="./assets/fa-book-open.png" alt="" />Lesson-${data.level_no}
        </button>`;
    levelContainer.appendChild(level);
  }
};

// wordLoad is a funtion to load all the word, it tiggered when any level got clicked, from displayLevel funciton it's receive which button actually has clicked.
// it also has a function named inactive which remove all the active class from all the button except the one clicked.

const wordLoad = (id) => {
  loadSpiner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((allWords) => {
      const clickedBtn = document.getElementById(`wordLoad(${id})`);
      const inactive = () => {
        const inactiveBtn = document.querySelectorAll(".inactive");
        inactiveBtn.forEach((inact) => inact.classList.remove("active"));
        clickedBtn.classList.add("active");
      };
      inactive();

      allWord(allWords.data);
    });
};

// allWord is the function which display all the word or cards when any level is being clicked. it receive an array of all words.
const allWord = (words) => {
  const wordContainer = document.getElementById("words-container");
  wordContainer.innerHTML = "";
  const wordText = document.getElementById("word-text");
  wordText.innerHTML = "";
  if (words.length == 0) {
    wordText.innerHTML = `
    
     <img class ="my-o mx-auto" src ="./assets/alert-error.png" alr="" />
    <div id="word-text">
        <p class="bangla-font mt-5 mb-1">Sorry!! There's no lesson yet</p>
        <p class="bangla-font text-4xl font-extrabold mb-4">
           Please Select Another Lesson
        </p>
      </div>`;
    loadSpiner(false);
    return;
  }

  words.forEach((word) => {
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `
    <div class=" bg-white rounded-xl h-full flex justify-between flex-col shadow-lg p-8">
        <div class="mb-2">
          <h4 class="text-2xl font-bold mb-3">${word.word ? word.word : "no word"}</h4>
          <p>Meaning/Pronounciation</p>
          <h5 class="text-2xl mt-3 mb-3 ">${word.meaning ? word.meaning : "no word"}/${word.pronunciation ? word.pronunciation : "no word"}</h5>
        </div>
        <div class="flex justify-between items-center ">
          <span id="${word.id}" onclick='loadWordDetails(${word.id})'
            class="flex justify-center items-center w-14 h-14 bg-blue-100 rounded-lg"
            ><i class="fa-solid fa-circle-info"></i
          ></span>
          <span
            class="flex justify-center items-center w-14 h-14 bg-blue-100 rounded-lg"
            ><i class="fa-solid fa-volume"></i
          ></span>
        </div>
      </div>

      `;

    wordContainer.appendChild(newDiv);
  });
  loadSpiner(false);
};

// loadWordDetails is a function to fetch the words details api, it triggerd when information btn is been clicked in allword funciton. It sends an unique id of which info button is clicked

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

// displayWordDetails function actually display the word details card when info button clicked.
const displayWordDetails = (details) => {
  const modalText = document.getElementById("modal-text");
  modalText.innerHTML = `
     <div class="flex flex-col gap-1">
      <h3 class="text-2xl font-bold">${details.word}(${details.pronunciation})</h3>

      <p class="font-bold mt-3">Meaning</p>
      <span>${details.meaning}</span>

      <p class="font-bold mt-3">Example</p>
      <span>${details.sentence}</span>

      <p class="bangla-font font-bold mt-3 mb-1">সমার্থক শব্দ গুলো</p>

      <div class="flex gap-1">
        ${synonymsBtn(details.synonyms)}
      </div>
    </div>
  `;
  document.getElementById("my_modal").showModal();
};

document.getElementById("btn-search").addEventListener("click", async () => {
  const inactiveBtn = document.querySelectorAll(".inactive");
  inactiveBtn.forEach((inact) => inact.classList.remove("active"));

  const input = document.getElementById("input-search").value.toLowerCase();

  const url = "https://openapi.programming-hero.com/api/words/all";
  const res = await fetch(url);
  const details = await res.json();
  const allWords = details.data;
  const filterWord = allWords.filter((word) =>
    word.word.toLowerCase().includes(input),
  );
  allWord(filterWord);
  document.getElementById("input-search").value = "";
});

loadLesson();
