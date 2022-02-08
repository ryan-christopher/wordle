var words = []
var letterspot;
var word;
var tile;
var answerWord;

function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                words = allText.split("\n");
            }
        }
    }
    rawFile.send(null);
}
readTextFile("words.txt");

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
    //The maximum is inclusive and the minimum is inclusive
  }

function getRandomWord(){
    wordValue = getRandomIntInclusive(0, words.length - 1);
    word = words[wordValue];
    console.log(word);
    answerWord = word;
}

function enterLetter(key){
    if (currentWord.length < 5) {
        currentWord += key;
        letterspot = document.getElementById(`${guesses}-${currentWord.length}`)
        letterspot.innerHTML = key;
    }
}

function removeLetter(){
    if (currentWord.length > 1){
        letterspot = document.getElementById(`${guesses}-${currentWord.length}`)
        letterspot.innerHTML = "";
        currentWord = currentWord.slice(0, -1);
    }
    else{
        letterspot = document.getElementById(`${guesses}-${1}`)
        letterspot.innerHTML = "";
        currentWord = "";
    }
}

function checkLetters(){
    if (currentWord.length === 5){
        if (!words.includes(currentWord)){
            alert("That word is not in this dictionary, enter a valid word.")
        }
        else{
            for (let i = 1; i < 6; i++) {
                tile = document.getElementById(`${guesses}-${i}`);
                if (answerWord.includes(currentWord[i-1]) && answerWord[i-1]===currentWord[i-1]){
                    tile.classList.add("turn-green");
                }
                else if (answerWord.includes(currentWord[i-1]) && answerWord[i-1]!=currentWord[i-1]){
                    tile.classList.add("turn-yellow");
                }
                else{
                    tile.classList.add("turn-black");
                }
                
            }
            guesses += 1;
            currentWord = "";
        }
    }
    else{
        alert("You need a five letter word.")
    }

}

keyboard_input = (event) => {
    if (event.keyCode > 64 && event.keyCode < 91 && currentWord.length < 5){
        enterLetter(event.key);
    }
    else if (event.keyCode === 8){
        removeLetter();
    }
    else if (event.keyCode === 13){
        checkLetters();
    }
}

addEventListener("keydown", keyboard_input);

guesses = 1;
currentWord = "";

setTimeout((answerWord = getRandomWord()) => {}, 50);