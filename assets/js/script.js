const currentTime = dayjs();
  const currentTimeFormatted = currentTime.format("dddd, MMMM D");
  $("#todays-date").text(currentTimeFormatted);

let time;
let formattedTime;
let tasks;
let tense;

const timeBlock = {
  time,
  formattedTime,
  tasks,
  tense,
};

let timeBlocks = [
  { time: 9, formattedTime: "9AM", tasks: "", tense: "" },
  { time: 10, formattedTime: "10AM", tasks: "", tense: "" },
  { time: 11, formattedTime: "11AM", tasks: "", tense: "" },
  { time: 12, formattedTime: "12PM", tasks: "", tense: "" },
  { time: 13, formattedTime: "1PM", tasks: "", tense: "" },
  { time: 14, formattedTime: "2PM", tasks: "", tense: "" },
  { time: 15, formattedTime: "3PM", tasks: "", tense: "" },
  { time: 16, formattedTime: "4PM", tasks: "", tense: "" },
  { time: 17, formattedTime: "5PM", tasks: "", tense: "" },
];

init();

function init() {
  let storedTimeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));
  if (storedTimeBlocks !== null) {
    timeBlocks = storedTimeBlocks;
  }

  for (var i = 0; i < timeBlocks.length; i++) {
    evaluateTime(i);
    renderSchedule(i);
  }
}

function evaluateTime(i) {
  if (timeBlocks[i].time < currentTime.$H) {
    timeBlocks[i].tense = "tasksPast";
  } else if (timeBlocks[i].time === currentTime.$H) {
    timeBlocks[i].tense = "tasksPresent";
  } else {
    timeBlocks[i].tense = "tasksFuture";
  }
}

function renderSchedule(i) {
  const mainEl = $("#main");

  const timeBlockEl = $("<div>");
  timeBlockEl.addClass("row time-block");
  timeBlockEl.attr("id", timeBlocks[i].formattedTime);

  const timeTextEl = $("<div>");
  timeTextEl.addClass("d-flex col-1 align-items-center justify-content-center");
  timeTextEl.attr("id", "time");
  timeTextEl.text(timeBlocks[i].formattedTime);
  timeBlockEl.append(timeTextEl);

  const tasksTextEl = $("<textarea>");
  tasksTextEl.addClass("col-10");
  tasksTextEl.attr("id", timeBlocks[i].tense);
  tasksTextEl.attr("rows", "3");
  tasksTextEl.text(timeBlocks[i].tasks);
  timeBlockEl.append(tasksTextEl);

  const saveButtonEl = $("<button>");
  saveButtonEl.addClass("btn saveBtn col-1 text-center fas fa-save");
  saveButtonEl.attr("id", timeBlocks[i].formattedTime);

  timeBlockEl.append(saveButtonEl);

  mainEl.append(timeBlockEl);
}

const saveButtonEl = $(".saveBtn");
const textAreaEl = $("textarea");

saveButtonEl.on("click", function (e) {
  let targetId = e.target.id;
  let buttonIndex = saveButtonEl.index(e.target);
  let targetTextContent = textAreaEl[buttonIndex].value;
  updateTimeBlock(targetId, targetTextContent);
});

function updateTimeBlock(targetId, targetTextContent) {
  for (var i = 0; i < timeBlocks.length; i++) {
    if (targetId === timeBlocks[i].formattedTime) {
      timeBlocks[i].tasks = targetTextContent;
    }
  }
  localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
}
