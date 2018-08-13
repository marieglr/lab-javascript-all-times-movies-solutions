/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes

function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(function(elem) {
    var hours = 0;
    var minutes = 0;
    if (elem.duration.includes("h")) {
      hours = parseInt(elem.duration[0], 10) * 60;
    }
    if (elem.duration.includes("min")) {
      minutes = parseInt(
        elem.duration.substring(
          elem.duration.length - 5,
          elem.duration.length - 3
        ),
        10
      );
    }
    return Object.assign({}, elem, { duration: hours + minutes });
  });
}

// Get the average of all rates with 2 decimals
function ratesAverage(myMoviesArr) {
  var totalRate = myMoviesArr.reduce(function(acc, curr) {
    //This if statement is to please Jasmine:
    // ('Return Average even if one of the movies does not have rate!')
    //(Don't tell Nizar I said that but if you're thinking the way this test is written doesn't make sense, I agree!)
    if (curr.rate === "") {
      curr.rate = 0;
    }

    return acc + parseFloat(curr.rate);
  }, 0);
  return parseFloat((totalRate / myMoviesArr.length).toFixed(2));
}

// Get the average of Drama Movies

function dramaMoviesRate(myMoviesArray) {
  //Filter the original array to get only the drama movies
  var myDramaArr = myMoviesArray.filter(function(movie) {
    return movie.genre.includes("Drama");
  });

  //check if the drama array is not empty
  if (myDramaArr.length > 0) {

    //return the average rate of the filtered array
    return ratesAverage(myDramaArr);
  }
}

// Order by time duration, in growing order
function orderByDuration(moviesArray) {
  moviesArray.sort(function(a, b) {
    if (a.duration === b.duration) {
      if (a.title > b.title) {
        return 1;
      }
    }
    return a.duration - b.duration;
  });
  return moviesArray;
}

// How many movies did STEVEN SPIELBERG
function howManyMovies(aMoviesArrayAgain) {

  //check if the movies array is not empty
  if (aMoviesArrayAgain.length > 0) {

    //filter the movies array to get only movies that were directed by Spielberg AND are drama movies
    var spielbergMovies = aMoviesArrayAgain.filter(function(movie) {
      return (
        movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
      );
    });

    //retrun the total amount of Spielberg's dramas
    return (
      "Steven Spielberg directed " + spielbergMovies.length + " drama movies!"
    );
  }
}



// Order by title and print the first 20 titles

function orderAlphabetically(thisArrayIsMadeOfMoviesMyFriend) {

  //Get an array with only the movie titles
  var movieTitles = thisArrayIsMadeOfMoviesMyFriend.map(function(oneMovie) {
    return oneMovie.title;
  });

  //Sort the movie titles in alphabetical order
  movieTitles.sort(function(titleA, titleB) {
    titleA.toUpperCase(); // ignore upper and lowercase
    titleB.toUpperCase(); // ignore upper and lowercase
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
  });

  //keep only the first 20 ones
  return movieTitles.slice(0, 20);
}

// BONUS --------------------Best yearly rate average



function bestYearAvg(someMovies) {
  //Check if the movies array is not empty
  if (someMovies.length > 0) {

    //Creates an object with years as keys and arrays of movies made that year as values
    var moviesGroupedByYearObj = yearGrouper(someMovies);

    //Creates an array of average rates for each year
    var yearAvgRatesArr = averagePerYear(someMovies);

    // selects the best annual rate from the array above
    var bestAnnualRate = calculateBestAvgRate(yearAvgRatesArr);

    // Stores the index of the best annual rate
    var index = yearAvgRatesArr.indexOf(bestAnnualRate);

    //creates on array with only the years where movies were made
    var yearsArr = Object.keys(moviesGroupedByYearObj);

    //The index of the best year and the index of the best annual rate are the same 
    //since these two arrays were originally the keys/values of the same object
    //To find the year that corresponds to the best avg rate,
    // we just need to look into the array of years and select the one with the index we stored
    var bestYear = yearsArr[index];

    return (
      "The best year was " +
      bestYear +
      " with an average rate of " +
      bestAnnualRate
    );
  }
}


//HELPER FUNCTIONS : 

function yearGrouper(moviesArray) {
  var moviesGroupedByYear = {};

  //iterate through the movies to change the data structure into an object with movie rates groupes by years
  moviesArray.forEach(movie => {
    var year = movie.year;

    //if this year already exists as a key, push the movie rate into the array
    if (moviesGroupedByYear[year]) {
      return moviesGroupedByYear[year].push(movie.rate);
    }

    //if this year doesnt exist as a key yet, create the key with this movie's rate as the first element of the array
    moviesGroupedByYear[year] = [movie.rate];
  });

  //once the object includes all the movies, return it
  return moviesGroupedByYear;
}

function averagePerYear(moviesArray) {
  var yearRates = yearGrouper(moviesArray);
  var yearRatesArray = Object.values(yearRates);
  var yearAvgRatesArr = [];
  yearRatesArray.forEach(year => {
    var totalRate = year.reduce((acc, current) => {
      return parseFloat(acc) + parseFloat(current);
    }, 0);
    var yearAvgRate = parseFloat((totalRate / year.length).toFixed(2));
    yearAvgRatesArr.push(yearAvgRate);
  });
  return yearAvgRatesArr;
}


function calculateBestAvgRate(moviesArray) {
  var currentBest = 0;
  moviesArray.forEach(rate => {
    if (rate > currentBest) {
      currentBest = rate;
    }
  });
  return currentBest;
}




