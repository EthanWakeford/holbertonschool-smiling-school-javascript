$(document).ready(function () {
  loadQuotes();
  loadVideos("popular-tutorials");
  loadVideos("latest-videos");
  getCourses();
  addListeners();
});

function loadQuotes() {
  $.ajax({
    url: "https://smileschool-api.hbtn.info/quotes",
    method: "get",
    success: function (response) {
      placeQuotes(response);
    },
    error: function () {
      alert("Quotes failed to load");
    },
  });
}

function placeQuotes(data) {
  for (quote of data) {
    $(".quotes .carousel-inner").append(`
    <div class="carousel-item">
      <div class="d-flex flex-sm-row flex-column justify-content-center align-items-center px-3">
        <img src="${quote.pic_url}" alt="" class="mr-sm-5 mb-3 d-block rounded-circle img-fluid" width="150px">
        <div>
          <p>${quote.text}</p>
          <b>${quote.name}</b>
          <p class="font-italic">${quote.title}</p>
        </div>
      </div>
    </div>`);
  }
  $(".quotes .loading").remove();
  $(".quotes .carousel-item").first().addClass("active");
  $(".quotes").append(`
    <a class="carousel-control-prev" href="#blah" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon white"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#blah" role="button" data-slide="next">
      <span class="carousel-control-next-icon white"></span>
      <span class="sr-only">Next</span>
    </a>`);
}

function loadVideos(videoType) {
  $.ajax({
    url: `https://smileschool-api.hbtn.info/${videoType}`,
    method: "get",
    success: function (response) {
      placeVideos(response, videoType);
    },
    error: function () {
      alert("error loading videos");
    },
  });
}

function placeVideos(data, videoType) {
  for (video of data) {
    $(`#${videoType} .carousel-inner`).append(`
      <div class="carousel-item col-12 col-sm-6 col-md-3 col-lg-3">
        <div class="card">
          <img src="${
            video.thumb_url
          }" class="bg-img card-img-top" alt="thumbnail" />
          <div class="card-body">
            <h5>${video.title}</h5>
            <p>${video["sub-title"]}</p>
            <div class="row">
              <img src="${
                video.author_pic_url
              }" alt="tiny profile" style="height: 20px;" class="mx-3 rounded-circle">
              <h6 class="text-light">${video.author}</h6>
            </div>
            <!-- stars -->
            <div class="stars row mx-0">
              <img src="./images/star_${
                video.star >= 1 ? "on" : "off"
              }.png" height="15px" width="15px">
              <img src="./images/star_${
                video.star >= 2 ? "on" : "off"
              }.png" height="15px" width="15px">
              <img src="./images/star_${
                video.star >= 3 ? "on" : "off"
              }.png" height="15px" width="15px">
              <img src="./images/star_${
                video.star >= 4 ? "on" : "off"
              }.png" height="15px" width="15px">
              <img src="./images/star_${
                video.star >= 5 ? "on" : "off"
              }.png" height="15px" width="15px">
              <h6 class="text-light ml-auto">${video.duration}</h6>
            </div>
          </div>
        </div>
      </div>`);
  }
  $(`#${videoType} .loading`).remove();
  $(`#${videoType} .carousel-item`).first().addClass("active");
  $(`#${videoType}`).append(`
    <a class="carousel-control-prev" href="#${videoType}" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon black"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#${videoType}" role="button" data-slide="next">
      <span class="carousel-control-next-icon black"></span>
      <span class="sr-only">Next</span>
    </a>`);
}

function getCourses() {
  console.log($("#topic").text());
  $.ajax({
    url: "https://smileschool-api.hbtn.info/courses",
    method: "GET",
    data: {
      q: $("#search_value").val(),
      topic: $("#topic").text(),
      sort: snakeCase($("#sort_by").text()),
    },
    success: function (response) {
      console.log(response);
      createCourses(response.courses);
    },
    error: function () {
      console.log("failed query");
    },
  });
}

function createCourses(courses) {
  $("#course_count").text(`${courses.length} videos`);
  for (let course of courses) {
    $("#courses").append(`
    <div class="col my-3">
      <div>
        <img class="card-img-top" src="${course.thumb_url}" alt="">
        <img class="card-img-overlay play mx-auto mt-5 p-0" src="images/play.png">
      </div>
      <div class="card-body">
        <h1 class="card-title lead font-weight-bold text-dark">${
          course.title
        }</h1>
        <p class="card-text text-secondary">${course["sub-title"]}</p>
        <div class="row">
          <img class="rounded-circle ml-3" src="${
            course.author_pic_url
          }" height="25px" width="25px" alt="">
          <p class="ml-3 text-light">${course.author}</p>
        </div>
        <div class="row align-items-center justify-content-between px-4">
          <div class="row">
          <img src="./images/star_${
            course.star >= 1 ? "on" : "off"
          }.png" height="15px" width="15px">
          <img src="./images/star_${
            course.star >= 2 ? "on" : "off"
          }.png" height="15px" width="15px">
          <img src="./images/star_${
            course.star >= 3 ? "on" : "off"
          }.png" height="15px" width="15px">
          <img src="./images/star_${
            course.star >= 4 ? "on" : "off"
          }.png" height="15px" width="15px">
          <img src="./images/star_${
            course.star >= 5 ? "on" : "off"
          }.png" height="15px" width="15px">
          </div>
          <p class="text-light ml-3 pt-3">${course.duration}</p>
        </div>
      </div>
    </div>
    `);
  }
}

function addListeners() {
  $("#topic_container a").click(function () {
    setTopic(this.text);
  });

  $("#sort_by_container a").click(function () {
    setSort(this.text);
  });

  $("#search_value").change(function () {
    $("#courses").empty();
    getCourses();
  });
}

function setTopic(text) {
  $("#courses").empty();
  $("#topic").text(text);
  getCourses();
}

function setSort(text) {
  $("#courses").empty();
  $("#sort_by").text(text);
  getCourses();
}

function snakeCase(string) {
  return string
    .replace(/\d+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
}
