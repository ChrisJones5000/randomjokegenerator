/*On button click, pull quote from "http://www.icndb.com/api/" API*/
/*On button click, tweet quote*/

var jokeCountURL = "http://api.icndb.com/jokes/count";

//set Joke to output div
function setJoke(url) {
	$.getJSON(url, function(json){
		var html = '<p>' + json.value.joke + '</p>';
		$('#output').html(html);
	}); //end getJSON
}; //end setJoke()

//get joke based on explicit designation
function getRandomJoke() {
	var randomJokesURL = "http://api.icndb.com/jokes/random";
	var excludeExplicitURL = "http://api.icndb.com/jokes/random?exclude=[explicit]"
	if ($('#explicitCheck').prop("checked")){
		setJoke(excludeExplicitURL);
	} else {
		setJoke(randomJokesURL);
	}	
}; //end getRandomJoke()

//Tweet joke
function tweetJoke() {
	var joke = $('#output').text();
	var tweetURL = "https://twitter.com/intent/tweet?text=";

	//Reduce size of tweet to 140 characters if longer
	if (joke.length > 140) {
		var truncJoke = joke.substring(0, 137) + '...';
		tweetURL += truncJoke;
	} else {
		tweetURL += joke;
	}
	//Open tweet window
	window.open(tweetURL);
}; //end tweetJoke()

/*Get random jokes on click*/
$('#get-joke-btn').on('click', function(){
	//If output container has content
	if ($('#output').html().length > 0) {
		//Slide previous joke out to left
		$('#output').animate({
			right: '150%'
		}, 500, function(){
			//Get new joke
			getRandomJoke();
			//Slide current joke in from left
			$('#output').animate({
				right: '0'
			}, 500);
		});					
	} else {
		//Get first joke
		getRandomJoke();
		//Slide first joke in from left
		$('#output').animate({
			right: "0"
		}, 500);
	}	
});

/*Find number of jokes in database*/
$.getJSON(jokeCountURL, function(json){
	var jokeCount = json.value;
	var html = "<p>There are currently " + jokeCount + " jokes in the database.</p>";
	$('#count-widget').html(html);
	//move count widget into field of view
	$('#count-widget').removeClass('slide-off-left').addClass('animate slide-in-right');
}); //end getJSON

$('#tweet-btn').on('click', function(){
	tweetJoke();
}); //end tweet button click