const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((levels) => displayLevel(levels.data));
};

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

const wordLoad = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((allWords) => {
      const clickedBtn = document.getElementById(`wordLoad(${id})`);
      const inactive = document.querySelectorAll(".inactive");
      inactive.forEach((inact) => inact.classList.remove("active"));

      clickedBtn.classList.add("active");

      allWord(allWords.data);
    });
};
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
    return;
  }

  words.forEach((word) => {
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `
    <div class="border rounded-xl h-full flex justify-between flex-col shadow-lg p-8">
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
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (details) => {
  const modalText = document.getElementById("modal-text");
  modalText.innerHTML = `
     <div class="flex flex-col gap-1">
      <h3 class="text-2xl font-bold">${details.word}(${details.pronunciation})</h3>

      <p class="font-bold mt-3">Meaning</p>
      <span>${details.meaning}</span>

      <p class="font-bold mt-3">Example</p>
      <span>${details.sentence}</span>

      <p class="bangla-font font-bold mt-3">সমার্থক শব্দ গুলো</p>

      <div class="flex gap-1">
        <span class="p-2 rounded-lg bg-blue-200 font-black">${details.synonyms[0]}</span>
        <span class="p-2 rounded-lg bg-blue-200 font-black">${details.synonyms[1]}</span>
        <span class="p-2 rounded-lg bg-blue-200 font-black">${details.synonyms[2]}</span>
      </div>
    </div>
  `;
  document.getElementById("my_modal").showModal();
};

loadLesson();
