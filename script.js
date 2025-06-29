document.addEventListener("DOMContentLoaded", () => {
  const user = {
    weightKg: 118,
    heightCm: 185
  };

  const workouts = {
    Monday: [
      { name: "Barbell Squats", img: "images/squat.jpg", video: "https://www.youtube.com/watch?v=Dy28eq2PjcM", calories: 100 },
      { name: "Bench Press", img: "images/bench.jpg", video: "https://www.youtube.com/watch?v=gRVjAtPip0Y", calories: 80 }
    ],
    Tuesday: [
      { name: "Cable Flies", img: "images/cablefly.jpg", video: "https://www.youtube.com/watch?v=eozdVDA78K0", calories: 70 }
    ],
    Wednesday: [
      { name: "Deadlift", img: "images/deadlift.jpg", video: "https://www.youtube.com/watch?v=op9kVnSso6Q", calories: 120 }
    ],
    Thursday: [], // Yoga day
    Friday: [],   // Rest/stretch day
    Saturday: [
      { name: "Lat Pulldown", img: "images/latpulldown.jpg", video: "https://www.youtube.com/watch?v=CAwf7n6Luuc", calories: 90 }
    ],
    Sunday: []    // Yoga again
  };

  const yogaSessions = [
    { title: "Full Body Stretch", img: "images/stretch1.jpg", link: "https://www.youtube.com/watch?v=v7AYKMP6rOE" },
    { title: "Yoga for Relaxation", img: "images/stretch2.jpg", link: "https://www.youtube.com/watch?v=4pKly2JojMw" },
    { title: "Posture & Flexibility", img: "images/stretch3.jpg", link: "https://www.youtube.com/watch?v=8TuRYV71Rgo" }
  ];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDayIndex = new Date().getDay();


  const dayNameEl = document.getElementById("day-name");
  const currentDayEl = document.getElementById("current-day");
  const container = document.getElementById("workout-container");
  const caloriesEl = document.getElementById("calories-burned");

  let completedCount = 0;

  function renderDay(index) {
    const day = days[index];
    completedCount = 0;
    container.innerHTML = "";
    caloriesEl.innerHTML = "";
    dayNameEl.textContent = day;
    currentDayEl.textContent = day;

    const todayWorkouts = workouts[day];

    if (!todayWorkouts || todayWorkouts.length === 0) {
      container.innerHTML = "<h3>Today's Activity: Stretch or Yoga</h3><table class='yoga-table'>" +
        yogaSessions.map(s =>
          `<tr><td><img src='${s.img}' /></td><td><a href='${s.link}' target='_blank'>${s.title}</a></td></tr>`
        ).join("") + "</table>";
      return;
    }

    let totalCalories = 0;

    todayWorkouts.forEach((exercise, i) => {
      totalCalories += exercise.calories || 50;

      const card = document.createElement("div");
      card.className = "exercise-card";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `exercise-${i}`;
      checkbox.addEventListener("change", () => {
        checkbox.checked ? completedCount++ : completedCount--;
        checkAllComplete(totalCalories);
      });

      const label = document.createElement("label");
      label.htmlFor = `exercise-${i}`;
      label.innerHTML = `<h2>${exercise.name}</h2>`;

      card.appendChild(checkbox);
      card.appendChild(label);
      card.innerHTML += `
        <img src="${exercise.img}" alt="${exercise.name}" />
        <p><a href="${exercise.video}" target="_blank">Watch Tutorial</a></p>
      `;
      container.appendChild(card);
    });

    caloriesEl.textContent = `Estimated calories burned: ~${totalCalories} kcal`;
  }

  function checkAllComplete(totalCalories) {
    const total = document.querySelectorAll('.exercise-card').length;
    if (completedCount === total) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        alert(`🎉 Great job, Abdallah! You completed all your workouts today and burned ~${totalCalories} kcal!`);
      }, 500);
    }
  }

  document.getElementById("prev-day").addEventListener("click", () => {
    currentDayIndex = (currentDayIndex - 1 + days.length) % days.length;
    renderDay(currentDayIndex);
  });

  document.getElementById("next-day").addEventListener("click", () => {
    currentDayIndex = (currentDayIndex + 1) % days.length;
    renderDay(currentDayIndex);
  });

  renderDay(currentDayIndex);
});
