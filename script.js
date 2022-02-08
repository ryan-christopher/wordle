var words = []
var letterspot;

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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
    //The maximum is inclusive and the minimum is inclusive
  }

function getRandomWord(){
    wordValue = getRandomIntInclusive(0, words.length - 1);
    var word = words[wordValue];
    console.log(word);
}

function enterLetter(key){
    if (currentWord.length < 5) {
        currentWord += key;
        console.log(currentWord);
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
    console.log(currentWord);
}

function checkLetters(){
    if (currentWord.length === 5){
        if (!words.includes(currentWord)){
            alert("That word is not in this dictionary.")
        }
        else{
            console.log("Checking!");
            for (let i = 1; i < 6; i++) {
                var tile = document.getElementById(`${guesses}-${i}`);
                tile.classList.add("turn-green")
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
readTextFile("words.txt");
guesses = 1;
currentWord = "";