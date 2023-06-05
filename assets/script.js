let $ = function (id) {
  return document.getElementById(id)
}

const TOTAL_ROWS = 7;//4;
const TOTAL_COLS = 16;//10;
var initdata = new Array(TOTAL_ROWS);

function createDataTable() {
  for (var i = 0; i < initdata.length; i++) {
    initdata[i] = new Array(TOTAL_COLS);
    for (var j = 0; j < initdata[i].length; j++) {
      initdata[i][j] = "<span class='space'></span>"
    }
  }
}

function makeTableHTML(myArray) {
  var result = "<table class='table-data'>";
  for(var i=0; i<myArray.length; i++) {
      result += "<tr>";
      for(var j=0; j<myArray[i].length; j++){
          result += "<td>"+myArray[i][j]+"</td>";
      }
      result += "</tr>";
  }
  result += "</table>";

  return result;
}
//https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/content.txt
//global variable
const words = [];
const hints = [];
let LOCALSTORAGE_WORD = "words";
let LOCALSTORAGE_HINT = "hints";
let LOCALSTORAGE_PLAYER_SCORE_1 = "player_score_1"
let LOCALSTORAGE_PLAYER_SCORE_2 = "player_score_2"
let word;
let hint;
let finalword; // words that do not contain whitespaces
let answerArray = [];
let userGuess;
let rightGuess = false;
let userRightGuess = 0;
let left = 99999;
let wins = 0;
let losses = 0;
let initIndex = 0;
let result = [];
let isShown = 1;
let manualResult = [];
let nextCharCount = 0;

async function removeWord() {
  let selectedIndex = $("word-list").selectedIndex;
  $("word-list").remove(selectedIndex);
  //remove from array and save to local storage
  const data = await axios.get('/players')
  .then(response => {
    const players = response.data;
    // Do something with the players data
    return players;
  })
  .catch(error => {
    console.error('Error fetching players:', error);
  });
  words = data[0].words;
  hints = data[0].hint
  words.splice(selectedIndex, 1);
  hints.splice(selectedIndex, 1);
  localStorage.setItem(LOCALSTORAGE_WORD, JSON.stringify(words));
  localStorage.setItem(LOCALSTORAGE_HINT, JSON.stringify(hints));

  const plater1 = {
    _id : data[0]._id,
    words: words,
    hints: hints
  };
  const plater2 = {
    _id : data[1]._id,
    words: words,
    hints: hints
  };

  const playerData = [plater1,plater2]
  console.error('playerData fetching players:', playerData);
  await axios.post('/players/word', playerData)
    .then(response => {
      // Handle the response
      console.log(response.data);
    })
    .catch(error => {
      // Handle the error
      console.error('Error updating players:', error);
    });


}

function removeOptions(selectElement) {
  if (!document.body.contains(selectElement)) return;
  var i, L = selectElement.options.length - 1;
  for(i = L; i >= 0; i--) {
     selectElement.remove(i);
  }
}
async function loadPlayerScore (){
  const data = await axios.get('/players')
  .then(response => {
    const players = response.data;
    // Do something with the players data
    return players;
  })
  .catch(error => {
    console.error('Error fetching players:', error);
  });

  if (document.body.contains($("player-left-score"))) {
    setInterval(function() {
      $("player-left-score").innerHTML =  parseInt(data[0].score)
    }, 1000);
  }
  if (document.body.contains($("player-right-score"))) {
    setInterval(function() {
      $("player-right-score").innerHTML =  parseInt(data[1].score)
    }, 1000);
  }
}

async function fetchApiGetScoreInterval() {
  const data = await axios.get('/players')
  .then(response => {
    const players = response.data;
    // Do something with the players data
    return players;
  })
  .catch(error => {
    console.error('Error fetching players:', error);
  });

  if (document.body.contains(document.getElementById("player-left-score"))) {
    var score = parseInt(data[0].score);
    document.getElementById("player-left-score").innerHTML = score;
  }
  
  if (document.body.contains(document.getElementById("player-right-score"))) {
    var score = parseInt(data[1].score);
    document.getElementById("player-right-score").innerHTML = score;
  }
}
 
async function loadData() {
  removeOptions($("word-list"))

  const data = await axios.get('/players')
  .then(response => {
    const players = response.data;
    // Do something with the players data
    return players;
  })
  .catch(error => {
    console.error('Error fetching players:', error);
  });

  if (data[0] === null) {
    words.push("bac bang duong", "dai tay duong", "bien dong", "an do duong", "ca heo xanh", "san ho", "thai binh duong", "hoang mac");
    hints.push("Tên đại dương lạnh nhất trên thế giới", "Tên đại dương nằm giữa châu Mĩ, châu Âu và châu Phi", "Tên một vùng biển nằm ở phía đông phần đất liền của nước ta", 
    "Tên đại dương nằm hoàn toàn ở bán cầu Đông", "Tên một loài động vật có vú sống ở đại dương", "Tên của loài sinh vật có bộ xương như đá vôi, dạng cánh hoa, nhiều màu sắc sống ở biển", 
    "Tên đại dương lớn nhất thế giới", "Cảnh thiên nhiên chiếm phần lớn diện tích của lục địa Australia");
    localStorage.setItem(LOCALSTORAGE_WORD, JSON.stringify(words));
    localStorage.setItem(LOCALSTORAGE_HINT, JSON.stringify(hints));
    data[0].words = words
    data[0].hints = hints
  } else {
    let tempwords = data[0].words;
    let temhints = data[0].hints;
    // let tempwords = JSON.parse(localStorage.getItem(LOCALSTORAGE_WORD)) || JSON.parse(data[0].words);
    // let temhints = JSON.parse(localStorage.getItem(LOCALSTORAGE_HINT)) || JSON.parse(data[0].hints);
    words.length = 0;//clear array
    hints.length = 0;
    for (let i = 0; i < tempwords.length; i++) {
      words.push(tempwords[i])
      hints.push(temhints[i])

      //load to list to display
      if (document.body.contains($("word-list"))) {
        var option = document.createElement("option");
        option.text = tempwords[i] + " - " + temhints[i];
        $("word-list").add(option);
      }
    }
  }
  // load score for admin page
  // if (localStorage.getItem(LOCALSTORAGE_PLAYER_SCORE_1) === null) {
  //   localStorage.setItem(LOCALSTORAGE_PLAYER_SCORE_1, JSON.stringify(0))
  if (data[0].scope === null) {
    data[0].scope = JSON.stringify(0);
    localStorage.setItem(LOCALSTORAGE_PLAYER_SCORE_1, JSON.stringify(0))
    
  } else {
    if (document.body.contains($("input-score-player-1"))) {

      $("input-score-player-1").value = localStorage.getItem(LOCALSTORAGE_PLAYER_SCORE_1)
      $("input-score-player-1").value = parseInt(data[0].score)
    }
  }
  if (data[1].scope === null) {
    data[1].scope = JSON.stringify(0);
    localStorage.setItem(LOCALSTORAGE_PLAYER_SCORE_2, JSON.stringify(0))
  } else {
    if (document.body.contains($("input-score-player-2"))) {
      $("input-score-player-2").value = localStorage.getItem(LOCALSTORAGE_PLAYER_SCORE_2)
      $("input-score-player-2").value =  parseInt(data[1].score)
    }
  }
  // setinterval to read score
  //
  // if (document.body.contains($("player-left-score"))) {
  //   setInterval(function() {
  //     $("player-left-score").innerHTML = localStorage.getItem(LOCALSTORAGE_PLAYER_SCORE_1)
  //     $("player-left-score").innerHTML =  parseInt(data[0].score)

  //   }, 1000);
  // }
  // if (document.body.contains($("player-right-score"))) {
  //   setInterval(function() {
  //     $("player-right-score").innerHTML = localStorage.getItem(LOCALSTORAGE_PLAYER_SCORE_2)
  //     $("player-right-score").innerHTML =  parseInt(data[1].score)
  //   }, 1000);
  // }
  if (document.body.contains(document.getElementById("player-left-score"))) {
    var score = parseInt(data[0].score);
    document.getElementById("player-left-score").innerHTML = score;
  }
  
  if (document.body.contains(document.getElementById("player-right-score"))) {
    var score = parseInt(data[1].score);
    document.getElementById("player-right-score").innerHTML = score;
  }
}

window.onload = function() {
  setInterval(function() {
    fetchApiGetScoreInterval
  }, 1000);
  loadData();
  initialGame()
  winsScore()
  lossesScore();
  
};

async function saveWord() {
  let inputWord = $('input-word').value.trim();
  let inputHint = $('input-hint').value.trim();
  const data = await axios.get('/players')
  .then(response => {
    const players = response.data;
    // Do something with the players data
    return players;
  })
  .catch(error => {
    console.error('Error fetching players:', error);
  });


  // let tempwords = JSON.parse(localStorage.getItem(LOCALSTORAGE_WORD));
  // let temhints = JSON.parse(localStorage.getItem(LOCALSTORAGE_HINT));
  let tempwords = data[0].words;
  let temhints = data[0].hints;
  
  tempwords.push(inputWord)
  temhints.push(inputHint)

  //save to local storage
  localStorage.setItem(LOCALSTORAGE_WORD, JSON.stringify(tempwords));
  localStorage.setItem(LOCALSTORAGE_HINT, JSON.stringify(temhints));
  const plater1 = {
    _id : data[0]._id,
    words: tempwords,
    hints: temhints
  };
  const plater2 = {
    _id : data[1]._id,
    words: tempwords,
    hints: temhints
  };

  const playerData = [plater1,plater2]
  console.error('playerData fetching players:', playerData);
  await axios.post('/players/word', playerData)
    .then(response => {
      // Handle the response
      console.log(response.data);
    })
    .catch(error => {
      // Handle the error
      console.error('Error updating players:', error);
    });


  //reload data
  loadData()
  $("message").innerHTML = "Đã lưu dữ liệu"
}

//random word
function random() {
  result.length = 0;
  // let random = Math.floor(Math.random() * words.length);
  word = words[initIndex]
  hint = hints[initIndex]
  finalword = word.replace(/ /g,'')
  initIndex++;
  if (initIndex == words.length) initIndex = 0;
}

function getSentences() {
  let separatedChunks = word.split(" ");
  let str_temp;
  let sentences = [];
  for (i = 0; i < separatedChunks.length - 1; i++) {
    let chunk = separatedChunks[i];
    let nextChunk = separatedChunks[i + 1];
    if (chunk.length <= TOTAL_COLS) {
      if (chunk.length + nextChunk.length + 1 <= TOTAL_COLS) { // +1 for space
        sentences.push(chunk + " " + nextChunk)
      }
      else {
        sentences.push(chunk)
      }
    } else {
      // chunk exceeds row length
    }
  }
  return sentences;
}

//show blank start
function showBlank() {
  let separatedChunks = word.split(" ");
  let row = 2, col = 1, count = 0;
  let total_word_len = word.length;
  if (total_word_len <= TOTAL_COLS) {
    let col_center = parseInt(TOTAL_COLS/2);
    let word_center = parseInt(total_word_len/2);
    if (total_word_len % 2 != 0) {
      col = col_center - word_center - 1;
    } else {
      col = col_center - word_center;
    }
    if (col < 0) col = 0;
  } else {
    for (i = 0; i < separatedChunks.length; i++) {
      let chunk = separatedChunks[i];
    }
    // console.log(total_word_len % TOTAL_COLS)
  }
  // let sentences = getSentences();
  // for (i = 0; i < sentences.length; i++) {
  //   console.log(sentences[i])
  // }
  for (i = 0; i < separatedChunks.length; i++) {
    for (j = 0; j < separatedChunks[i].length; j++, col++, count++) {
      initdata[row][col] = "<span onclick='getLetter(\""+ separatedChunks[i][j] + "," + row + "," + col +"\")' style='--i:"+ (count) +"' class='letter'></span>"
      let d = {
        'char': separatedChunks[i][j],
        'row': row,
        'col': col
      }
      result.push(d)
    }
    if (col < initdata[row].length - 1) initdata[row][++col] = "<span class='space'></span>"
    
    if (separatedChunks.length > 1 && i < separatedChunks.length - 1) {
      let nextWordLen = separatedChunks[i+1].length
      let nextCellLen = initdata[row].length - (col);
      if (nextCellLen < nextWordLen) {
        row++; col = 1
      }
    }
  }
  // set 4 corners to white bg
  initdata[0][0] = "<span class='space_corner'></span>" // left top
  initdata[0][TOTAL_COLS-1] = "<span class='space_corner'></span>" // right top
  initdata[TOTAL_ROWS - 1][0] = "<span class='space_corner'></span>" // left bottm
  initdata[TOTAL_ROWS - 1][TOTAL_COLS-1] = "<span class='space_corner'></span>" // right bottom
  $("guess").innerHTML = makeTableHTML(initdata)//answerArray.join(" ")
  $("game-hint").innerHTML = hint;
}

function getLetter(data) {
  let char = data.split(",")[0]
  let row = data.split(",")[1]
  let col = data.split(",")[2]
  
  for (i = 0; i < result.length; i++) {
    if (char === result[i].char && row == result[i].row && col == result[i].col) {
      initdata[row][col] = "<span class='letter'>" + char + "</span>"
      rightGuess = true
      userRightGuess++
    }
  }
  $("guess").innerHTML = makeTableHTML(initdata)
  // for (let j = 0; j < word.length; j++) {
  //     if (j === letterIndex) {
  //       answerArray.splice(letterIndex,1, "<span class='letter'>" + word[letterIndex] + "</span>")
  //     } else {
  //       answerArray[j] = answerArray[j].replace("anim",'');
  //     }
  // }
  // $("guess").innerHTML = answerArray.join(" ")
  
  if (matchLength()) {
    let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/win-2.mp3');
    audio.play()
    wins++
    winsScore()
    // setTimeout(initialGame, 2000)
  } else {
      let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/ting.mp3');
      audio.play()
  }
}

//guesses left
function guessesLeft() {
  $("left").innerHTML = left
}

//wins
function winsScore() {
  $("wins").innerHTML = wins
}

//losses
function lossesScore() {
  $("losses").innerHTML = losses
}

//show wrong guess
function wrongGuess(char) {
  $("wrong").innerHTML += char + ", "
}

// resent function
function initialGame() {
  if ($("winImage")) {
      $("winImage").remove()
  }

  left = 99999;
  answerArray = [];
  $("wrong").innerHTML = "";
  userRightGuess = 0
  rightGuess = false;
  isShown = 1;
  nextCharCount = 0;
  createDataTable();
  guessesLeft()
  random()
  showBlank()
  let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/initial.mp3');
  audio.play()
  audio.onended = function() {
    var letter_temps = document.querySelectorAll(".letter");
    letter_temps.forEach(item => {
      // ✅ Remove class from each element
      item.classList.remove('anim');
    });
  };
  
}

// call initial function
// initialGame()
// winsScore()
// lossesScore()

//change bg of correctly selected letter
function changeBGCorrectLetters(char) {
  if (isShown == 1) {
    for (i = 0; i < result.length; i++) {
      if (char === result[i].char) {
        var row = result[i].row
        var col = result[i].col
        initdata[row][col] = "<span onclick='getLetter(\""+ char + "," + row + "," + col +"\")' class='change_bg_letter'></span>";
        let obj = {
          'char': char,
          'row': row,
          'col': col
        }
        manualResult.push(obj);
        rightGuess = true
        // userRightGuess++
      }
    }
    $("guess").innerHTML = makeTableHTML(initdata)
  }

}
//check letter
function showLetter(char, str) {
  if (isShown == 2) { //show when the letter is pressed the second time
    for (i = 0; i < result.length; i++) {
      if (char === result[i].char) {
        var row = result[i].row
        var col = result[i].col
        initdata[row][col] = "<span class='letter'>" + char + "</span>"
        rightGuess = true
        userRightGuess++
      }
    }
    $("guess").innerHTML = makeTableHTML(initdata)
    isShown = 0;
  }
  
}

//check length
let matchLength = function() {
  if (finalword.length === userRightGuess) return true
  else return false
}

document.onkeydown = function(event) {
  rightGuess = false;
  if(event.key == 1 && nextCharCount <= manualResult.length - 1) {
    let obj = manualResult[nextCharCount];
    let char = obj.char;
    let row = obj.row;
    let col = obj.col;
    initdata[row][col] = "<span class='letter'>" + char + "</span>"
    $("guess").innerHTML = makeTableHTML(initdata)
    
    rightGuess = true
    userRightGuess++
    nextCharCount++;
    isShown = 1;
    if (nextCharCount >= manualResult.length) {
        manualResult = [];
        nextCharCount = 0;
    }
    if (matchLength()) {
        let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/win-2.mp3');
        audio.play()
        wins++
        winsScore()
        // setTimeout(initialGame, 2000)
    } else {
      let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/ting.mp3');
      audio.play()
    }
    
  }
  if (event.shiftKey && event.ctrlKey) {
    // $("guess").innerHTML = word
    
    for (let i = 0; i < finalword.length; i++) {
      isShown = 2;
       showLetter(finalword[i], word)
    }
    let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/win-2.mp3');
    audio.play()
    
  } else if (event.keyCode === 13) {
    
    if (document.body.contains($("start"))) $("start").remove();
    initialGame()// restart new game
  } else {
    if (event.shiftKey || event.ctrlKey || event.key == 1) return;
    userGuess = event.key.toLowerCase();

    changeBGCorrectLetters(userGuess)
    showLetter(userGuess, word)
    isShown++;
    
    if (rightGuess) {
        rightGuess = false
        if (matchLength()) {
            let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/win-2.mp3');
            audio.play()
            wins++
            winsScore()
            // setTimeout(initialGame, 2000)
        } else {
            if (isShown == 2) {
              let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/correct.mp3');
              audio.play()
            } else if (isShown == 1) {
              let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/ting.mp3');
              audio.play()
            }
            
        }
    } else {
      isShown = 1;
        left--
        if (left < 1) {
            let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/lose.mp3');
            audio.play()
            initialGame()
            losses++
            lossesScore()
        } else {
            let audio = new Audio('https://wordgame-vin30.s3.eu-north-1.amazonaws.com/assets/fail.mp3');
            audio.play()
            wrongGuess(userGuess)
            guessesLeft()
        }
  
    }
  }
}

async function savePlayerScore() {
  let scorePlayer1 = $("input-score-player-1").value
  let scorePlayer2 = $("input-score-player-2").value
 const data = await axios.get('/players')
  .then(response => {
    const players = response.data;
    // Do something with the players data
    return players;
  })
  .catch(error => {
    console.error('Error fetching players:', error);
  });

  const plater1 = {
    _id : data[0]._id,
    score: parseInt(scorePlayer1),
  };
  const plater2 = {
    _id : data[1]._id,
    score: parseInt(scorePlayer2),
  };

  const playerData = [plater1,plater2]
  console.error('playerData fetching players:', playerData);
  await axios.post('/players/update', playerData)
    .then(response => {
      // Handle the response
      console.log(response.data);
    })
    .catch(error => {
      // Handle the error
      console.error('Error updating players:', error);
    });

  localStorage.setItem(LOCALSTORAGE_PLAYER_SCORE_1, scorePlayer1);
  localStorage.setItem(LOCALSTORAGE_PLAYER_SCORE_2, scorePlayer2);
  loadData();
  $("message-player").innerHTML = "Đã lưu"
}

//user guess
/*document.onkeyup = function(event) {
  userGuess = event.key.toLowerCase();

  showLetter(userGuess, word)
  
  if (rightGuess) {
      rightGuess = false
      if (matchLength()) {
          let audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3');
          audio.play()
          // img.setAttribute("id","winImage")
          // parent.appendChild(img)
          wins++
          winsScore()
          setTimeout(initialGame, 2000)
      } else {
          let audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3');
          audio.play()
      }
  } else {
      left--
      if (left < 1) {
          let audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3');
          audio.play()
          initialGame()
          losses++
          lossesScore()
      } else {
          let audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3');
          audio.play()
          wrongGuess(userGuess)
          guessesLeft()
      }

  }
}*/