//for project 1 expanding cards
const panels = document.querySelectorAll(".panel");
panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeAcitveClasses();
    panel.classList.add("active");
  });
});

function removeAcitveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}

$(document).ready(function () {
  //for homepage buttons of 50 projects. I felt lazy typing them one by one
  for (let i = 1; i <= 50; i++) {
    $("#projects").append(
      "<button><a href='html/project-" +
        i +
        ".html'>Project " +
        i +
        "</a></button>"
    );
  }
});
