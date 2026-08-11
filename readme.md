# 🌐 English Janala

A fun and interactive web app to help Bengali speakers learn English vocabulary — with pronunciations, meanings, synonyms, and a built-in search feature.

---

## 🔗 Live Demo

👉 [Click here to visit the live site](https://tanvir-samiul.github.io/English_Janala/)

---

## ✨ Features

- 📚 **7 Lesson Levels** — Browse vocabulary by difficulty level
- 🔍 **Search** — Instantly search any English word from the entire word bank
- 🔊 **Pronunciation** — Click the volume icon to hear the word spoken out loud
- ℹ️ **Word Details** — Click the info icon to see meaning, example sentence, and synonyms
- 🔄 **Loading Spinner** — Smooth loading experience while fetching data
- 📱 **Responsive Design** — Works on mobile, tablet, and desktop

---

## 🛠️ Built With

| Technology            | Purpose                                |
| --------------------- | -------------------------------------- |
| HTML5                 | Structure                              |
| Tailwind CSS v4 (CDN) | Styling                                |
| DaisyUI v5            | UI Components (navbar, modal, spinner) |
| Font Awesome          | Icons                                  |
| JavaScript (ES6+)     | Logic and API handling                 |
| Web Speech API        | Word pronunciation                     |

---

## 📡 API Used

This project uses the **Programming Hero Open API**:

| Endpoint          | Description                          |
| ----------------- | ------------------------------------ |
| `/api/levels/all` | Fetch all lesson levels              |
| `/api/level/:id`  | Fetch all words for a specific level |
| `/api/word/:id`   | Fetch details of a specific word     |
| `/api/words/all`  | Fetch all words (used for search)    |

Base URL: `https://openapi.programming-hero.com`

---

## 📁 Project Structure

```
English_Janala/
├── assets/          # Images and icons
├── index.html       # Main HTML file
├── index.js         # All JavaScript logic
├── tailwind.css     # Custom styles
└── readme.md        # Project documentation
```

## 💡 What I Learned

- Fetching and displaying data from a REST API
- Using `async/await` for cleaner asynchronous code
- Dynamic DOM manipulation with `createElement` and `innerHTML`
- Using the **Web Speech API** for text-to-speech
- Implementing a **search/filter** feature on API data
- Showing/hiding a loading spinner during API calls
- Working with **DaisyUI modals** for word detail popups
- Writing clean, commented, and organized JavaScript

---
