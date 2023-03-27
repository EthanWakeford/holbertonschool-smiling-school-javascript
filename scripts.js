$(document).ready(function() {
  loadQuotes();
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
  $('.carousel-item').first().addClass('active');
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
