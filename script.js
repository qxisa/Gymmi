document.addEventListener("DOMContentLoaded", () => {
  const user = {
    weightKg: 118,
    heightCm: 185
  };

  const workouts = {
    Monday: [
      { name: "Barbell Squats", img: "images/squat.jpg", video: "https://www.youtube.com/watch?v=Dy28eq2PjcM", sets:4 , reps:6 },
      { name: "Barbell Bench Press", img: "images/bench.jpg", video: "https://www.youtube.com/watch?v=gRVjAtPip0Y", sets:4 , reps:6  },
      { name: "Lat Pulldown", img: "images/latpulldown.jpg", video: "https://www.youtube.com/watch?v=CAwf7n6Luuc", sets:4 , reps:8  },
      { name: "Seated Row", img: "images/seatedrow.jpg", video: "https://www.youtube.com/watch?v=GZbfZ033f74", sets:3 , reps:10  },
      { name: "Dumbbell Shoulder Press", img: "images/shoulderpress.jpg", video: "https://www.youtube.com/watch?v=qEwKCR5JCog", sets:3 , reps:10 },
      { name: "Plank", img: "images/plank.jpg", video: "https://www.youtube.com/watch?v=B296mZDhrP4", sets:3 , reps:30 "sec"  }
    ],
    Tuesday: [
      { name: "Chest Press", img: "images/chestpress.jpg", video: "https://www.youtube.com/watch?v=EVt3eG3Dt6w", sets:3 , reps:12  },
      { name: "Cable Flies", img: "images/cablefly.jpg", video: "https://www.youtube.com/watch?v=eozdVDA78K0", sets:3 , reps:15  },
      { name: "Lateral Raise", img: "images/lateralraise.jpg", video: "https://www.youtube.com/watch?v=kDqklk1ZESo", sets:3 , reps:15  },
      { name: "Bicep Curls", img: "images/bicepcurl.jpg", video: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo", sets:3 , reps:12  },
      { name: "Tricep Pushdowns", img: "images/triceppushdown.jpg", video: "https://www.youtube.com/watch?v=2-LAMcpzODU", sets:3 , reps:15  },
      { name: "Incline Walk", img: "images/treadmill.jpg", video: "https://www.youtube.com/watch?v=QJ5xNKn9nBU"  }
    ],
    Wednesday: [
      { name: "Deadlift", img: "images/deadlift.jpg", video: "https://www.youtube.com/watch?v=op9kVnSso6Q", sets:4 , reps:5  },
      { name: "Incline Dumbbell Press", img: "images/inclinepress.jpg", video: "https://www.youtube.com/watch?v=8iPEnn-ltC8", sets:3 , reps:8  },
      { name: "Pull-Ups", img: "images/pullup.jpg", video: "https://www.youtube.com/watch?v=eGo4IYlbE5g", sets:3 , reps:5  },
      { name: "Seated Shoulder Press", img: "images/seatedshoulder.jpg", video: "https://www.youtube.com/watch?v=B-aVuyhvLHU", sets:3 , reps:10  },
      { name: "Cable Row", img: "images/cablerow.jpg", video: "https://www.youtube.com/watch?v=pYcpY20QaE8", sets:3 , reps:12  },
      { name: "Hanging Knee Raises", img: "images/kneeraises.jpg", video: "https://www.youtube.com/watch?v=JB2oyawG9KI", sets:3 , reps:15  }
    ]
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
        <p><strong>Sets:</strong> ${exercise.sets || 3}, <strong>Reps:</strong> ${exercise.reps || 10}</p>
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
