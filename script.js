var words = []

function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
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
  

readTextFile("words.txt");
