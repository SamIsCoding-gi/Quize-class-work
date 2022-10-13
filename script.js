// Questions will be asked//
const questions = [
    { id: 0, i: 'images/trump.jpg',
     a: [{ text: "George Washington", isCorrect: false },{ text: "John Adams", isCorrect: false },
        { text: "James Madison", isCorrect: false }, { text: "Donald John Trump", isCorrect: true } ] }, 

        { id: 1, i: 'images/kim.jpg',
        a: [{ text: "George Washington", isCorrect: false },{ text: "John Adams", isCorrect: false },
           { text: "James Madison", isCorrect: false }, { text: "Donald John Trump", isCorrect: true } ] }, 

   
           { id: 2, i: 'images/joe.jpg',
           a: [{ text: "George Washington", isCorrect: false },{ text: "John Adams", isCorrect: false },
              { text: "James Madison", isCorrect: false }, { text: "Donald John Trump", isCorrect: true } ] }, 

              { id: 3, i: 'images/putin.jpg',
              a: [{ text: "George Washington", isCorrect: false },{ text: "John Adams", isCorrect: false },
                 { text: "James Madison", isCorrect: false }, { text: "Donald John Trump", isCorrect: true } ] }, 

                 { id: 4, i: 'images/Recep.jpg',
                 a: [{ text: "George Washington", isCorrect: false },{ text: "John Adams", isCorrect: false },
                    { text: "James Madison", isCorrect: false }, { text: "Donald John Trump", isCorrect: true } ] }, 

                    { id: 5, i: 'images/Trudeau.jpg',
                    a: [{ text: "George Washington", isCorrect: false },{ text: "John Adams", isCorrect: false },
                       { text: "James Madison", isCorrect: false }, { text: "Donald John Trump", isCorrect: true } ] }, 

                       { id: 6, i: 'images/mahmoud.jpg',
                       a: [{ text: "George Washington", isCorrect: false },{ text: "John Adams", isCorrect: false },
                          { text: "James Madison", isCorrect: false }, { text: "Donald John Trump", isCorrect: true } ] }, 

                          { id: 7, i: 'images/borisJohnson.jpg',
                          a: [{ text: "George Washington", isCorrect: false },{ text: "John Adams", isCorrect: false },
                             { text: "James Madison", isCorrect: false }, { text: "Donald John Trump", isCorrect: true } ] }, 

                             { id: 8, i: 'images/AngelaMerkel.jpg',
                             a: [{ text: "George Washington", isCorrect: false },{ text: "John Adams", isCorrect: false },
                                { text: "James Madison", isCorrect: false }, { text: "Donald John Trump", isCorrect: true } ] }, 


  ];
  
  // Set start//
  const game = {
    active: true,
    currentQuestion: 0,
    selectedAnswer: null,
    evaluated: false,
    score: 0
  };

  var wrapperScreen = document.querySelector('.wrapper');
  var questionsWrapperScreen = document.querySelector('.questionsWrapperScreen');

  
  
  function updateAnswerStatus() {
    const hasNext = game.currentQuestion < questions.length - 1;
    
    
    //$('#btnEvaluate').attr('disabled', game.evaluated || !game.selectedAnswer);
    $('#btnNext').attr('disabled', !game.selectedAnswer || !hasNext);
    

    if(!hasNext && game.selectedAnswer){
      
        setTimeout(()=>{
          questionsWrapperScreen.classList.add('hidden')
          location.href = 'result.html';
        },610);
       

    }else if(hasNext && game.selectedAnswer){
        $('#btnNext').text("Next Question");
        game.currentQuestion = game.currentQuestion + 1;
        renderCurrentQuestion();
    } else {
        $('#btnNext').text("...");
    }
  }
  
  function selectAnswer(selectedAnswer) {
    if (!game.evaluated) {
      game.selectedAnswer = selectedAnswer;
    
      $('#optionList .option').each(function () {
        const option = $(this);
        const answer = option.data('answer');
      
        if (answer === selectedAnswer) {
          option.addClass('selected');
          evaluateAnswer();
        } else {
          option.removeClass('selected');
        }
      });
  
      updateAnswerStatus()
    }
  }
  
  function evaluateAnswer() {
    if (!game.evaluated && game.selectedAnswer) {
      game.evaluated = true;
      
      $('#optionList .option').each(function () {
        const option = $(this);
        const answer = option.data('answer');
  
        if (answer === game.selectedAnswer) {
          option.addClass( answer.isCorrect ? 'correct' :  'incorrect');
          game.score = game.score + (answer.isCorrect ? 1 : 0);
          localStorage.setItem("score", game.score);
        }
      });
      
      updateAnswerStatus();
    }
  }
  
  function createOption(answer) {
    return $('<button>')
      .data({ answer })
      .text(answer.text)
      .addClass('option')
      .on('click', function() {
        selectAnswer(answer);
      })
    ;
  }
  
  function renderCurrentQuestion() {
    const question = questions[game.currentQuestion];
      
    if (question) {
      const optList = $('#optionList').empty();
      const image = $('#image').empty();
  
      game.selectedAnswer = null;
      game.evaluated = false;
  
      image.append($('<img>').attr('src', question.i));
      
      for (const answer of question.a) {
        optList.append( createOption(answer) );
      }
    }  
         
    updateAnswerStatus();
  };
  
  // next question?
  // $('#btnNext').on('click', function() {
  //   game.currentQuestion = game.currentQuestion + 1;
  //   renderCurrentQuestion();
  // }).attr('disabled', true);
  
//   $('#btnEvaluate').on('click', function() {
//     evaluateAnswer();
//   });
  
  if (game.active) {
    renderCurrentQuestion();
  }


  // SPLASH SCREEN CODE

  var audio = new Audio('music/click.mp3')
  var audio2 = new Audio('music/clickUp.mp3')

    var splashScreen = document.querySelector('.splash');
  $('#btnContinue').on('click', function() {
    splashScreen.style.opacity = 0;
    audio2.load();
    audio2.play();
    setTimeout(()=>{
          splashScreen.classList.add('hidden')
        location.href = 'getUsername.html';
    },610)
  });

  $(".btnContinue").mousedown(function() {
    audio2.load();
    audio2.play();
  });
	
  $(".btnContinue").mouseup(function() {
    audio.load();
    audio.play();
  });

  $('#btnHowTo').on('click', function() {
    splashScreen.style.opacity = 0;
    audio2.load();
    audio2.play();
    setTimeout(()=>{
          splashScreen.classList.add('hidden')
        location.href = 'howToPlay.html';
    },610)
  });

  $(".btnHowTo").mousedown(function() {
    audio2.load();
    audio2.play();
  });
	
  $(".btnHowTo").mouseup(function() {
    audio.load();
    audio.play();
  });
    

  // Get Users Name
  $('#btnContinueUserName').on('click', function() {
    wrapperScreen.style.opacity = 0;
    audio2.load();
    audio2.play();

   const mUserName  = document.getElementById('usernameInput').value;
   localStorage.setItem("username", mUserName);

   console.log(localStorage.getItem("username"));

    setTimeout(()=>{
        wrapperScreen.classList.add('hidden')
        location.href = 'homeScreen.html';
    },610)
  });
