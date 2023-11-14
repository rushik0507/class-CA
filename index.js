var response;
var data;

const select_muscle = document.getElementById("select-muscle");
const select_equipment = document.getElementById("select-equipment");
const sidesection_title = document.querySelector(".section-title");
const sidesection = document.querySelector(".side-section");
const main_mid = document.querySelector(".main-mid");
const main_mid2 = document.querySelector(".main-mid2");
const mid2 = document.querySelector(".mid2");

fetch("./final.json")
  .then((response) => response.json())
  .then((d) => {
    // You can access the fetched data here
    data = d;
    // Do further processing with the data
  });

function list() {
  var flag = 0;
  for (index in data) {
    if (
      select_equipment.value == "All Equipment" &&
      select_muscle.value == "All Muscles"
    ) {
      allmuscle(index);
      flag = 1;
    } else if (
      data[index].muscle == select_muscle.value &&
      data[index].equipment == select_equipment.value
    ) {
      allmuscle(index);
      flag = 1;
    } else if (
      data[index].muscle == select_muscle.value &&
      select_equipment.value == "All Equipment"
    ) {
      allmuscle(index);
      flag = 1;
    } else if (
      data[index].equipment == select_equipment.value &&
      select_muscle.value == "All Muscles"
    ) {
      allmuscle(index);
      flag = 1;
    }
  }
  if (flag == 0) {
    const para = document.createElement("p");
    para.classList.add("m-0");
    para.innerText = "No Data Found";
    sidesection_title.innerHTML = "";
    sidesection_title.appendChild(para);
  } else {
    const para = document.createElement("p");
    para.classList.add("m-0");
    para.innerText = "Popular Exercises";
    sidesection_title.innerHTML = "";
    sidesection_title.appendChild(para);
  }
}

function allmuscle(index) {
  var side_exercise = document.createElement("div");
  side_exercise.classList.add("side-exercise", "d-flex");
  var ex_image = document.createElement("div");
  ex_image.classList.add("ex-image");
  var im = document.createElement("img");
  im.src = data[index].src;
  im.classList.add("ex-image", "rounded-circle", "p-2");
  ex_image.appendChild(im);
  side_exercise.appendChild(ex_image);
  var ex = document.createElement("div");
  ex.classList.add("ex", "pt-2");
  var ex_name = document.createElement("div");
  ex_name.classList.add("ex-name", "text-white");
  ex_name.innerText = data[index].name;
  var ex_muscle = document.createElement("div");
  ex_muscle.classList.add("ex-muscle", "text-secondary");
  ex_muscle.innerText = data[index].muscle;
  ex.appendChild(ex_name);
  ex.appendChild(ex_muscle);
  side_exercise.appendChild(ex);
  sidesection.appendChild(side_exercise);
  side_exercise.addEventListener("click", (event) => {
    changemid(ex_name.innerText);
  });
}

function changemid(ename) {
  main_mid.style.display = "none";
  main_mid2.style.display = "block";
  mid2.innerHTML = "";
  for (index in data) {
    if (data[index].name == ename) {
      console.log(index);
      const mid_title = document.createElement("div");
      mid_title.classList.add("mid-title", "text-white", "p-2", "fs-5");
      mid_title.innerText = data[index].name;
      const mid_image2 = document.createElement("div");
      mid_image2.classList.add("mid-image2", "h-75", "p-3", "w-100");
      var im2;
      if (data[index].isvideo) {
        im2 = document.createElement("video");
        im2.setAttribute("autoplay", "true");
        im2.setAttribute("loop", "true");
      } else {
        im2 = document.createElement("img");
      }
      im2.src = data[index].main;
      mid2_info = document.createElement("div");
      mid2_info.classList.add("mid2-info", "border-top");
      var p1 = document.createElement("p");
      p1.innerText = "Equipment:";
      var s1 = document.createElement("span");
      s1.innerText = data[index].equipment;
      var p2 = document.createElement("p");
      p2.innerText = "Primary Muscle Group:";
      var s2 = document.createElement("span");
      s2.innerText = data[index].muscle;
      p1.appendChild(s1);
      p2.appendChild(s2);
      mid_image2.appendChild(im2);
      mid2_info.appendChild(p2);
      mid2_info.appendChild(p1);
      mid2.appendChild(mid_title);
      mid2.appendChild(mid_image2);
      mid2.appendChild(mid2_info);
    }
  }
}

window.addEventListener("load", function () {
  sidesection.innerHTML = "";
  list();
});

select_muscle.addEventListener("change", function () {
  sidesection.innerHTML = "";
  list();
});

select_equipment.addEventListener("change", function () {
  sidesection.innerHTML = "";
  list();
});
