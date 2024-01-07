const mainEl = $("#main");

const now = dayjs();
const nowFormatted = now.format("dddd, MMMM D");
$("#todays-date").text(nowFormatted);

var storedTimeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));

var time;
var formattedTime;
var tasks;
var tense;

const timeBlock = {
  time,
  formattedTime,
  tasks,
  tense,
};

const timeBlocks = [
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

for (var i = 0; i < timeBlocks.length; i++) {
  evaluateTime(i);
  renderSchedule(i);
}

console.log(now.$H);

function renderSchedule(i) {
  var timeBlockEl = $("<div>");
  timeBlockEl.addClass("row time-block");
  timeBlockEl.attr("id", timeBlocks[i].formattedTime);

  var timeTextEl = $("<div>");
  timeTextEl.addClass("d-flex col-1 align-items-center justify-content-center");
  timeTextEl.attr("id", "time");
  timeTextEl.text(timeBlocks[i].formattedTime);
  timeBlockEl.append(timeTextEl);

  var tasksTextEl = $("<textarea>");
  tasksTextEl.addClass("col-10");
  tasksTextEl.attr("id", timeBlocks[i].tense);
  tasksTextEl.attr("rows", "3");
  tasksTextEl.text(storedTimeBlocks[i].tasks);
  timeBlockEl.append(tasksTextEl);

  var saveButtonEl = $("<button>");
  saveButtonEl.addClass("btn saveBtn col-1 text-center");
  saveButtonEl.attr("aria-label", "save");

  var iEl = $("<i>");
  iEl.addClass("fas fa-save");
  iEl.attr("aria-hidden", "true");
  saveButtonEl.append(iEl);

  timeBlockEl.append(saveButtonEl);

  mainEl.append(timeBlockEl);
}

function evaluateTime(i) {
    if (timeBlocks[i].time < now.$H) {
        timeBlocks[i].tense = "tasksPast";
    }
    else if (timeBlocks[i].time === now.$H) {
        timeBlocks[i].tense = "tasksPresent";
    }
    else {
        timeBlocks[i].tense = "tasksFuture";
    }
}

// localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));