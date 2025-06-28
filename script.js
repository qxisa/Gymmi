const workouts = {
  Monday: [
    { name: "Barbell Squats", img: "images/squat.jpg", video: "https://www.youtube.com/watch?v=Dy28eq2PjcM" },
    { name: "Barbell Bench Press", img: "images/bench.jpg", video: "https://www.youtube.com/watch?v=gRVjAtPip0Y" },
    { name: "Lat Pulldown", img: "images/latpulldown.jpg", video: "https://www.youtube.com/watch?v=CAwf7n6Luuc" },
    { name: "Seated Row", img: "images/seatedrow.jpg", video: "https://www.youtube.com/watch?v=GZbfZ033f74" },
    { name: "Dumbbell Shoulder Press", img: "images/shoulderpress.jpg", video: "https://www.youtube.com/watch?v=qEwKCR5JCog" },
    { name: "Plank", img: "images/plank.jpg", video: "https://www.youtube.com/watch?v=B296mZDhrP4" }
  ],
  Tuesday: [
    { name: "Chest Press", img: "images/chestpress.jpg", video: "https://www.youtube.com/watch?v=EVt3eG3Dt6w" },
    { name: "Cable Flies", img: "images/cablefly.jpg", video: "https://www.youtube.com/watch?v=eozdVDA78K0" },
    { name: "Lateral Raise", img: "images/lateralraise.jpg", video: "https://www.youtube.com/watch?v=kDqklk1ZESo" },
    { name: "Bicep Curls", img: "images/bicepcurl.jpg", video: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo" },
    { name: "Tricep Pushdowns", img: "images/triceppushdown.jpg", video: "https://www.youtube.com/watch?v=2-LAMcpzODU" },
    { name: "Incline Walk", img: "images/treadmill.jpg", video: "https://www.youtube.com/watch?v=QJ5xNKn9nBU" }
  ],
  Wednesday: [
    { name: "Deadlift", img: "images/deadlift.jpg", video: "https://www.youtube.com/watch?v=op9kVnSso6Q" },
    { name: "Incline Dumbbell Press", img: "images/inclinepress.jpg", video: "https://www.youtube.com/watch?v=8iPEnn-ltC8" },
    { name: "Pull-Ups", img: "images/pullup.jpg", video: "https://www.youtube.com/watch?v=eGo4IYlbE5g" },
    { name: "Seated Shoulder Press", img: "images/seatedshoulder.jpg", video: "https://www.youtube.com/watch?v=B-aVuyhvLHU" },
    { name: "Cable Row", img: "images/cablerow.jpg", video: "https://www.youtube.com/watch?v=pYcpY20QaE8" },
    { name: "Hanging Knee Raises", img: "images/kneeraises.jpg", video: "https://www.youtube.com/watch?v=JB2oyawG9KI" }
  ]
};

const today = new Date().toLocaleString("en-us", { weekday: "long" });
document.getElementById("day-name").textContent = today;

const container = document.getElementById("workout-container");
let completedCount = 0;

function checkAllComplete() {
  const total = document.querySelectorAll('.exercise-card').length;
  if (completedCount === total) {
    confetti();
    alert("🎉 Good job! You finished all your exercises for today!");
  }
}

if (workouts[today]) {
  workouts[today].forEach((exercise, index) => {
    const card = document.createElement("div");
    card.className = "exercise-card";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `exercise-${index}`;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) completedCount++;
      else completedCount--;
      checkAllComplete();
    });

    const label = document.createElement("label");
    label.htmlFor = `exercise-${index}`;
    label.innerHTML = `<h2>${exercise.name}</h2>`;

    card.appendChild(checkbox);
    card.appendChild(label);
    card.innerHTML += `
      <img src="${exercise.img}" alt="${exercise.name}" />
      <p><a href="${exercise.video}" target="_blank">Watch Tutorial</a></p>
    `;
    container.appendChild(card);
  });
} else {
  container.innerHTML = "<p>Today is a rest or active recovery day. Great job staying consistent!</p>";
}
