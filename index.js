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

  //   const wordText = document.getElementById("word-text");
  //   wordText.innerHTML = "";
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
    <div class="border rounded-xl h-full shadow-lg p-8">
        <div class="mb-2">
          <h4 class="text-2xl font-bold mb-3">${word.word ? word.word : "no word"}</h4>
          <p>Meaning/Pronounciation</p>
          <h5 class="text-2xl mt-3 mb-3">${word.meaning ? word.meaning : "no word"}/${word.pronunciation ? word.pronunciation : "no word"}</h5>
        </div>
        <div class="flex justify-between items-center">
          <span
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

loadLesson();
