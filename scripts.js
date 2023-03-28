$(document).ready(function() {
  loadQuotes();
  loadVideos();
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

function loadVideos() {
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    method: 'get',
    success: function(response) {
      placeVideos(response);
    },
    error: function() {
      alert('error loading videos');
    }
  })
}

function placeVideos(data) {
  console.log(data);
  for (tutorial of data) {
    $('#popular .carousel-inner').append(`
      <div class="carousel-item col-12 col-sm-6 col-md-3 col-lg-3">
        <div class="card">
          <img src="${tutorial.thumb_url}" class="bg-img card-img-top" alt="thumbnail" />
          <div class="card-body">
            <h5>${tutorial.title}</h5>
            <p>${tutorial['sub-title']}</p>
            <div class="row">
              <img src="${tutorial.author_pic_url}" alt="tiny profile" style="height: 20px;" class="mx-3 rounded-circle">
              <h6 class="text-light">${tutorial.author}</h6>
            </div>
            <!-- stars -->
            <div class="stars row mx-0">
              <img src="./images/star_${tutorial.star >= 1 ? 'on' : 'off'}.png" height="15px" width="15px">
              <img src="./images/star_${tutorial.star >= 2 ? 'on' : 'off'}.png" height="15px" width="15px">
              <img src="./images/star_${tutorial.star >= 3 ? 'on' : 'off'}.png" height="15px" width="15px">
              <img src="./images/star_${tutorial.star >= 4 ? 'on' : 'off'}.png" height="15px" width="15px">
              <img src="./images/star_${tutorial.star >= 5 ? 'on' : 'off'}.png" height="15px" width="15px">
              <h6 class="text-light ml-auto">${tutorial.duration}</h6>
            </div>
          </div>
        </div>
      </div>`);
    }
    $('#popular .loading').remove();
    $('#popular .carousel-item').first().addClass('active');
    $('#popular').append(`
    <a class="carousel-control-prev" href="#popular" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon black"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#popular" role="button" data-slide="next">
      <span class="carousel-control-next-icon black"></span>
      <span class="sr-only">Next</span>
    </a>`);
}
