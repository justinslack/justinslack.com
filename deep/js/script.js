document.getElementById('loadQuote').addEventListener("click", printQuote, false);
var message = '';
var viewedQuotes =[];

var quotes = [
	{
		quote: "Anachronism"
	},
	{
		quote: "Extremities"
	},
	{
		quote: "Agnostocism"
	},
	{
		quote: "Currents"
	},
	{
		quote: "Migration"
	},
	{
		quote: "Anvil"
	},
	{
		quote: "Permutations"
	},
	{
		quote: "Moods"
	},
	{
		quote: "Alterations"
	},
	{
		quote: "Cycles"
	},
	{
		quote: "Transportation"
	},
	{
		quote: "Struggles"
	},
	{
		quote: "Keyboard"
	},
	{
		quote: "Tea"
	},
	{
		quote: "Dinner"
	},
	{
		quote: "Shoe"
	},
	{
		quote: "Crevice"
	},
	{
		quote: "Trepidation"
	},
	{
		quote: "Motion"
	},
	{
		quote: "Purple"
	},
	{
		quote: "Oscillations"
	},
	{
		quote: "Shadows"
	},
	{
		quote: "Charisma"
	},
	{
		quote: "Pockets"
	},
	{
		quote: "Beard"
	},
	{
		quote: "Prenuptial"
	},
	{
		quote: "Influence"
	},
	{
		quote: "Distinction"
	},
	{
		quote: "Lacerations"
	},
	{
		quote: "Distress"
	},
];

function print(quote) {
	var outputDiv = document.getElementById('quote-box');
	outputDiv.innerHTML = quote;
}

function getRandomQuote() {
	var randomQuote = Math.floor(Math.random() * quotes.length);

	var splicedQuote = quotes.splice(randomQuote, 1)[0];
	viewedQuotes.push(splicedQuote);
	if ( quotes.length === 0 ) {
		quotes = viewedQuotes;
		viewedQuotes = [];
	}
	return splicedQuote;
}

function printQuote() {
	var quotes = getRandomQuote();
	message ='<p class="quote">Deep ' + quotes.quote + '</p>';
	print(message);
}
