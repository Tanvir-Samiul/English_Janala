fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((res) => res.json())
  .then((levels) => displayLevel(levels.data));

const displayLevel = (datas) => {
  const levelContainer = document.getElementById("levels-container");
  for (const data of datas) {
    const level = document.createElement("div");
    level.innerHTML = `
    <button onclick="wordLoad(${data.level_no})" class="btn   btn-primary btn-outline rounded-lg py-5 px-7">
          <img src="./assets/fa-book-open.png" alt="" />Lesson-${data.level_no}
        </button>`;
    levelContainer.appendChild(level);
  }
};

const wordLoad = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((allWords) => allWord(allWords.data));

  const wordText = document.getElementById("word-text");
  wordText.innerHTML = "";
};
const allWord = (words) => {
  const wordContainer = document.getElementById("words-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `
    <div class="border rounded-xl h-full shadow-lg p-8">
        <div class="mb-2">
          <h4 class="text-2xl font-bold mb-3">${word.word}</h4>
          <p>Meaning/Pronounciation</p>
          <h5 class="text-2xl mt-3 mb-3">${word.meaning}/${word.pronunciation}</h5>
        </div>
        <div class="flex justify-between items-center">
          <span
            class="flex justify-center items-center w-14 h-14 bg-blue-200 rounded-lg"
            ><i class="fa-solid fa-circle-info"></i
          ></span>
          <span
            class="flex justify-center items-center w-14 h-14 bg-blue-200 rounded-lg"
            ><i class="fa-solid fa-volume"></i
          ></span>
        </div>
      </div>

      `;

    wordContainer.appendChild(newDiv);
  });
};
