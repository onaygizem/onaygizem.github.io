// This is the javascript file
var mainScreenDOM = document.querySelector("#outLayer");
var mainScreenDOMJQ = $('#outLayer');

var searchNewReleaseList = $('#nowShowing');
var searchPopularList = $('#Popular');
var searchTopRatedList = $('#TopRated');
var searchList = $('#search-form');
var favouritesList = $('#favourites');
var openMovieModal = $('#modal-js-example');
var paginationItm = document.querySelector("#pagination");
var paginationItmJQ = $('#pagination');

var modalMovieImageItm = document.querySelector("#modalMovieImage");
var modalMovieTitleItm = document.querySelector("#modalMoviesTitle");
var modalMovieDescItm = document.querySelector("#modalMovieDesc");
var modalMovieGenreItm = document.querySelector("#modalMovieGenre");
var modalMoviePopItm = document.querySelector("#modalMoviePop");
var pageTitleItm = document.querySelector("#pageTitle");
var addToFavouritesItm = $('#addToFavourites');
var containerSection = document.querySelector(".section")
var whatIsOnNavItem = document.getElementById("whatIsOnNav");
var whatIsOnPageContainer = document.querySelector(".whatIsOnPageContainer")
var favoriteList;
var localStorageHistory = [];


// Home page to display the home page information
whatIsOnNavItem.addEventListener("click", ()=>{
  whatIsOnPageContainer.style.display = "block"; 
  containerSection.style.display = "none";
});

// The modal functionality function
function modalFunctionality() {
  let bodyElement = document.querySelector("body")
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
    bodyElement.style.position = "fixed";
    bodyElement.style.overflow = "hidden";
    bodyElement.style.width = "100%";
    bodyElement.style.height = "100%";
  }
  function closeModal($el) {
    $el.classList.remove('is-active');
    bodyElement.style.position = "unset";
    bodyElement.style.overflow = "unset";
    bodyElement.style.width = "unset";
    bodyElement.style.height = "unset";
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      let movieID = $trigger.children[0].getAttribute("movie-id")
      buttonOpenModal(movieID)
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
}



document.addEventListener('DOMContentLoaded', () => {
  let bodyElement = document.querySelector("body")
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
    bodyElement.style.position = "fixed";
    bodyElement.style.overflow = "hidden";
    bodyElement.style.width = "100%";
    bodyElement.style.height = "100%";
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
    bodyElement.style.position = "unset";
    bodyElement.style.overflow = "unset";
    bodyElement.style.width = "unset";
    bodyElement.style.height = "unset";
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
});

//Javascript query selector initialisations
var modalMovieImageItm = document.querySelector("#modalMovieImage");
var modalMovieTitleItm = document.querySelector("#modalMoviesTitle");
var modalMovieDescItm = document.querySelector("#modalMovieDesc");
var modalMovieGenreItm = document.querySelector("#modalMovieGenre");
var modalMoviePopItm = document.querySelector("#modalMoviePop");
var pageTitleItm = document.querySelector("#pageTitle");
var paginationTitleItm = document.querySelector("#paginationTitle");
var contentContainerItm = document.querySelector("#contentContainer");
var addToFavouritesItm = $('#modalFavorites');

//Page variables
var favoriteList;
var localStorageHistory = [];
var currentPage;
var currentPageNum;
var searchTitle;

//init by loading local storage
function init() {
  favoriteList = [];
  var localStorageHistory = JSON.parse(localStorage.getItem("movieFavourites"));
  if (!!localStorageHistory) {
    favoriteList = [...localStorageHistory];
  }
};


//when clicking new release tab
function buttonClickNewRelease(event, pageNum) {
  containerSection.style.display = "block";
  whatIsOnPageContainer.style.display = "none"; 

  //storing page number in and current search type in page variables for pagination
  currentPageNum = pageNum;
  currentPage = "New Release";
  //setting up search API call
  var appID = 'edae2dbf4933f27205a897a516b34101';
  var apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + appID + '&language=en-US&page=' + currentPageNum;

  //fetch from source API
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Run display method for DOM creation
      displayMovieList(data);
      //Set page title
      pageTitleItm.textContent = "New Releases";
    });
};

//when clicking popular tab
function buttonClickPopular(event, pageNum) {
  containerSection.style.display = "block";
  whatIsOnPageContainer.style.display = "none"; 

  //storing page number in and current search type in page variables for pagination
  currentPageNum = pageNum;
  currentPage = "Popular";

  //setting up search API call
  var appID = 'edae2dbf4933f27205a897a516b34101';
  var pageNum = 1;
  var apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + appID + '&language=en-US&page=' + currentPageNum;

  //fetch from source API
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Run display method for DOM creation
      displayMovieList(data);
      //Set page title
      pageTitleItm.textContent = "Popular Movies";
    });
};

//if a user clicks a pagination buttons run search on page clicked
function buttonPagination(event) {
  var element = event.target;
  //get the page number
  var pageNum = element.getAttribute("page");

  //just to check if the page is different
  if (parseInt(pageNum, 10) === currentPageNum) {
    return;
  }

  //test to see which page we are on to send search to of new page to that method
  if (currentPage === 'Popular') {
    buttonClickPopular(event, parseInt(pageNum, 10));
  } else if (currentPage === 'Top Rated') {
    buttonClickTopRated(event, parseInt(pageNum, 10));
  } else if (currentPage === 'Search') {
    buttonSearch(event, searchTitle, parseInt(pageNum, 10));
  } else if (currentPage === 'New Release') {
    buttonClickNewRelease(event, parseInt(pageNum, 10));
  }

};

//when clicking top rated tab
function buttonClickTopRated(event, pageNum) {
  containerSection.style.display = "block";
  whatIsOnPageContainer.style.display = "none"; 

  //storing page number in and current search type in page variables for pagination
  currentPageNum = pageNum;
  currentPage = "Top Rated";

  //setting up search API call
  var appID = 'edae2dbf4933f27205a897a516b34101';
  var apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + appID + '&language=en-US&page=' + pageNum;

  //fetch from source API
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayMovieList(data);
      pageTitleItm.textContent = "Top Rated Movies";
    });
};

//when user clicks to add movie to favorites
function addMovieToFavourites(event) {
  //get the movie id
  var element = event.target;
  var movieNum = element.getAttribute("movie-id");

  //if the movie is not in the favorites list then the user clicked to add
  if (favoriteList.includes(parseInt(movieNum, 10))) {
    //remove from favoties list
    favoriteList.splice(favoriteList.indexOf(parseInt(movieNum, 10)), 1);
    addToFavouritesItm.text("Add to Favourites");
    localStorage.setItem("movieFavourites", JSON.stringify(favoriteList));
  //if the movie is in the favorites list then the user clicked to remove
  } else {
    addToFavouritesItm.text("Remove from Favourites");
    favoriteList.push(parseInt(movieNum, 10));
    localStorage.setItem("movieFavourites", JSON.stringify(favoriteList));
  }

};

//when the user searches manually in the text field
function buttonSearch(event, title, pageNum) {
  containerSection.style.display = "block";
  whatIsOnPageContainer.style.display = "none"; 

  //storing page number in and current search type in page variables for pagination
  currentPageNum = pageNum;
  currentPage = "Search";

  //if there is nothing in the title then return and not process
  if (!title) {
    return;
  }
  //trim title

  title = title.trim();
  searchTitle = title;

  //setting up search API call
  var appID = 'edae2dbf4933f27205a897a516b34101';
  var pageNum = 1;
  var apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + appID + '&language=en-US&page=' + currentPageNum + '&query=' + title;

  //fetch from source API
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayMovieList(data);
      //display search information
      pageTitleItm.textContent = "Search for Movies - \"" + title + "\"";
    });
};

//when opening a modal of individual movie, process and update details
function buttonOpenModal(movieNumArg) {
  var movieNum = movieNumArg;

  //setting up search API call
  var appID = 'edae2dbf4933f27205a897a516b34101';
  var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieNum + '?api_key=' + appID + '&language=en-US';

  //fetch from source API
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      //update all the details with data
      var posterPath = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
      modalMovieImageItm.setAttribute('src', posterPath);

      modalMovieTitleItm.textContent = data.title;
      modalMovieDescItm.textContent = data.overview;
      addToFavouritesItm.attr("movie-id", movieNum);

      //genre is a list so loop to get all info added
      var genreArr = [];
      for (var i = 0; i < data.genres.length; i++) {
        genreArr.push(data.genres[i].name);
      }
      var genres = genreArr.join(", ");
      modalMovieGenreItm.textContent = "Genres: "+ genres;
      modalMoviePopItm.textContent = "Popularity: "+ data.vote_average;

      //if the movie is in the favorites list show link to remove
      if (favoriteList.includes(parseInt(movieNum, 10))) {
        addToFavouritesItm.text("Remove from Favourites");
      //else the movie is not in the favorites list show link to add
      } else {
        addToFavouritesItm.text("Add to Favourites");
      }
    });

};

//when the user clicks on the nav to view favorites
function buttonSearchFavourites(event) {
  containerSection.style.display = "block";
  whatIsOnPageContainer.style.display = "none"; 

  //empty DOM
  mainScreenDOMJQ.empty();
  paginationTitleItm.textContent = '';
  paginationItmJQ.empty();

  let favoriteListItems = favoriteList.length
  
  
  if(favoriteListItems != 0){
    for (var i = 0; i < favoriteListItems; i++) {
      var appID = 'edae2dbf4933f27205a897a516b34101';
      var apiUrl = 'https://api.themoviedb.org/3/movie/' + favoriteList[i] + '?api_key=' + appID + '&language=en-US';
  
      fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
  
          var posterPath = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
  
          var cardLayer = document.createElement("div");
          cardLayer.classList.add('column', 'is-one-quarter-desktop', 'is-half-tablet');
  
          var cardLayerInner = document.createElement("div");
          cardLayerInner.classList.add('card');
  
          var cardLink = document.createElement("a");
          cardLink.setAttribute('href', "#");
  
          var cardImage = document.createElement("div");
          cardImage.classList.add('card-image');
  
          var cardFig = document.createElement("figure");
          cardFig.classList.add('js-modal-trigger');
          cardFig.setAttribute('data-target', "modal-js-example");
          // cardFig.classList.add('image', 'is-5by2');
  
          var cardImg = document.createElement("img");
          cardImg.setAttribute('src', posterPath);
          cardImg.setAttribute('movie-id', data.id);
  
  
          cardFig.appendChild(cardImg);
          cardImage.appendChild(cardFig);
          cardLink.appendChild(cardImage);
          cardLayerInner.appendChild(cardLink);
          cardLayer.appendChild(cardLayerInner);
          mainScreenDOM.appendChild(cardLayer);
  
          modalFunctionality()
        });
      pageTitleItm.textContent = "Your Favourite Movies";
      paginationTitleItm.textContent = '';
      paginationItmJQ.empty();
  
    }
  } else {
    pageTitleItm.textContent = "No favourites to show yet";
  }

}

//display search results additions to DOM
var displayMovieList = function (data) {
  //clear DOM to renew
  mainScreenDOMJQ.empty();
  var totalPages = data.total_pages;
  for (var i = 0; i < data.results.length; i++) {
    //this skips movies with no posters
    if (data.results[i].poster_path == null) {
      continue;
    }

    //for each result in the API call JSON data array


    var posterPath = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;

    var cardLayer = document.createElement("div");
    cardLayer.classList.add('column', 'is-one-quarter-desktop', 'is-half-tablet');

    var cardLayer = document.createElement("div");
    cardLayer.classList.add('column', 'is-one-quarter-desktop', 'is-half-tablet');

    var cardLayerInner = document.createElement("div");
    cardLayerInner.classList.add('card');

    var cardLink = document.createElement("a");
    cardLink.setAttribute('href', "#");

    var cardImage = document.createElement("div");
    cardImage.classList.add('card-image');

    var cardFig = document.createElement("figure");
    cardFig.classList.add('js-modal-trigger');
    cardFig.setAttribute('data-target', "modal-js-example");

    var cardImg = document.createElement("img");
    cardImg.setAttribute('src', posterPath);
    cardImg.setAttribute('movie-id', data.results[i].id);


    cardFig.appendChild(cardImg);
    cardImage.appendChild(cardFig);
    cardLink.appendChild(cardImage);
    cardLayerInner.appendChild(cardLink);
    cardLayer.appendChild(cardLayerInner);
    mainScreenDOM.appendChild(cardLayer);

    //this is done for every movie and then added to DOM

  }

  //process pagination from here
  //max page limit 500 as this is a server limitation
  var maxPageLimit = 500;
  paginationItmJQ.empty();
  if (totalPages > maxPageLimit) {
    totalPages = maxPageLimit;
  }

  //print out first page, only if there are more than 4 pages as they will be printed out in the next step
  if (currentPageNum > 4) {
    var pageButtonFirst = document.createElement("a");
    pageButtonFirst.textContent = "First";
    pageButtonFirst.setAttribute('page', 1);
    pageButtonFirst.classList.add('button', 'is-dark');
    paginationItm.appendChild(pageButtonFirst);

  }
  //print out 4 pages before current page, but only if they are 4 pages before
  for (var i = currentPageNum - 3; i < currentPageNum; i++) {
    if (i > 0) {
      var pageButtonLeft = document.createElement("a");
      pageButtonLeft.textContent = i;
      pageButtonLeft.setAttribute('page', i);
      pageButtonLeft.classList.add('button', 'is-dark');
      paginationItm.appendChild(pageButtonLeft);
    }
  }

  //show current page, but in a different style
  var pageButtonCurrent = document.createElement("a");
  pageButtonCurrent.textContent = currentPageNum;
  pageButtonCurrent.setAttribute('page', 1);
  pageButtonCurrent.classList.add('button', 'is-light');
  paginationItm.appendChild(pageButtonCurrent);

  //print out 4 pages after current page, but only if they are 4 pages before
  for (var i = currentPageNum + 1; i < currentPageNum + 4; i++) {
    if (i <= totalPages && i <= maxPageLimit) {
      var pageButtonRight = document.createElement("a");
      pageButtonRight.textContent = i;
      pageButtonRight.setAttribute('page', i);
      pageButtonRight.classList.add('button', 'is-dark');
      paginationItm.appendChild(pageButtonRight);
    }
  }
  //print out last page, only if there are more than 4 pages
  if (currentPageNum < totalPages - 3) {
    var pageButtonLast = document.createElement("a");
    pageButtonLast.textContent = "Last";
    pageButtonLast.setAttribute('page', totalPages);
    pageButtonLast.classList.add('button', 'is-dark');
    paginationItm.appendChild(pageButtonLast);

  }

  //display pagination data in page
  var firstItemNum = (currentPageNum - 1) * 20 + 1;
  var lastItemNum = firstItemNum + data.results.length - 1;
  var totalEntries = data.total_results;
  if (data.total_results > maxPageLimit * 20) {
    totalEntries = maxPageLimit * 20;
  }
  paginationTitleItm.textContent = 'Showing ' + firstItemNum + ' - ' + lastItemNum + ' of ' + totalEntries + ' items.';

  modalFunctionality()
};

// fucntion to create page content
const clearContent = (container) => {
  while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
  }
}

init();

//all event listeners
searchNewReleaseList.on('click', event => buttonClickNewRelease(event, 1));
searchPopularList.on('click', event => buttonClickPopular(event, 1));
searchTopRatedList.on('click', event => buttonClickTopRated(event, 1));
searchList.on('submit', event => buttonSearch(event, $("#searchBar").val(), 1));
favouritesList.on('click', event => buttonSearchFavourites(event, 1));
addToFavouritesItm.on('click', addMovieToFavourites);
paginationItm.addEventListener('click', buttonPagination);
