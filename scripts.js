$(document).ready(function() {
  loadQuotes();
  loadVideos('popular-tutorials');
  loadVideos('latest-videos');
})

function loadQuotes() {
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    method: 'get',
    success: function(response) {
      placeQuotes(response);
    },
    error: function() {
      alert('Quotes failed to load');
    }
  })
}

function placeQuotes(data) {
  for (quote of data) {
    $('.quotes .carousel-inner').append(`
    <div class="carousel-item">
      <div class="d-flex flex-sm-row flex-column justify-content-center align-items-center px-3">
        <img src="${quote.pic_url}" alt="" class="mr-sm-5 mb-3 d-block rounded-circle img-fluid" width="150px">
        <div>
          <p>${quote.text}</p>
          <b>${quote.name}</b>
          <p class="font-italic">${quote.title}</p>
        </div>
      </div>
    </div>`)
  }
  $('.quotes .loading').remove();
  $('.quotes .carousel-item').first().addClass('active');
  $('.quotes').append(`
    <a class="carousel-control-prev" href="#blah" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon white"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#blah" role="button" data-slide="next">
      <span class="carousel-control-next-icon white"></span>
      <span class="sr-only">Next</span>
    </a>`)
}

function loadVideos(videoType) {
  $.ajax({
    url: `https://smileschool-api.hbtn.info/${videoType}`,
    method: 'get',
    success: function(response) {
      placeVideos(response, videoType);
    },
    error: function() {
      alert('error loading videos');
    }
  })
}

function placeVideos(data, videoType) {
  for (video of data) {
    $(`#${videoType} .carousel-inner`).append(`
      <div class="carousel-item col-12 col-sm-6 col-md-3 col-lg-3">
        <div class="card">
          <img src="${video.thumb_url}" class="bg-img card-img-top" alt="thumbnail" />
          <div class="card-body">
            <h5>${video.title}</h5>
            <p>${video['sub-title']}</p>
            <div class="row">
              <img src="${video.author_pic_url}" alt="tiny profile" style="height: 20px;" class="mx-3 rounded-circle">
              <h6 class="text-light">${video.author}</h6>
            </div>
            <!-- stars -->
            <div class="stars row mx-0">
              <img src="./images/star_${video.star >= 1 ? 'on' : 'off'}.png" height="15px" width="15px">
              <img src="./images/star_${video.star >= 2 ? 'on' : 'off'}.png" height="15px" width="15px">
              <img src="./images/star_${video.star >= 3 ? 'on' : 'off'}.png" height="15px" width="15px">
              <img src="./images/star_${video.star >= 4 ? 'on' : 'off'}.png" height="15px" width="15px">
              <img src="./images/star_${video.star >= 5 ? 'on' : 'off'}.png" height="15px" width="15px">
              <h6 class="text-light ml-auto">${video.duration}</h6>
            </div>
          </div>
        </div>
      </div>`);
    }
    $(`#${videoType} .loading`).remove();
    $(`#${videoType} .carousel-item`).first().addClass('active');
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
