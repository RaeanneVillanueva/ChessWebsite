var board = null
var game = new Chess()
var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'

window.onbeforeunload = function() {
  return "Leaving will cause you to lose. Continue?";
};

function removeGreySquares() {
  $('#onlinechessboard .square-55d63').css('background', '')
}

function greySquare(square) {
  var $square = $('#onlinechessboard .square-' + square)

  var background = whiteSquareGrey
  if ($square.hasClass('black-3c85d')) {
    background = blackSquareGrey
  }

  $square.css('background', background)
}

function onDragStart(source, piece) {
  // do not pick up pieces if the game is over
  if (game.game_over()) {
    return false
  }

  if (location.hash === '#host') {
    if (piece.search(/^b/) !== -1) {
      return false
    }
  } else {
    if (piece.search(/^w/) !== -1) {
      return false
    }
  }
}

function onDrop(source, target) {
  removeGreySquares()

  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })


  // illegal move
  if (move === null) return 'snapback'
  else {
    socket.emit("move", room, move)
    console.log("MOVED")
    if(game.game_over()) setTimeout(gameover, 2000)
  }
}

function onMouseoverSquare(square, piece) {
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  })

  // exit if there are no moves available for this square
  if (moves.length === 0) return

  // highlight the square they moused over
  greySquare(square)

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to)
  }
}

function onMouseoutSquare(square, piece) {
  removeGreySquares()
}

function onSnapEnd() {
  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
}

board = Chessboard('onlinechessboard', config)
// socket.emit("new-user", room)

if (location.hash === "#host") {
  board.orientation('white')
} else {
  board.orientation('black')
}

socket.on("move", (move) => {
  console.log("opponent moved " + move)
  game.move(move)
  board.position(game.fen())
  if (game.game_over()) setTimeout(gameover, 500)
})

function gameover(){
  
    var win = 1;
    if ((board.orientation() == 'white' && game.turn() == 'w' && game.in_checkmate()) ||
        (board.orientation() == 'black' && game.turn() == 'b' && game.in_checkmate())) {
      win = 0
    }else if(game.in_draw() || game.in_stalemate() || game.in_threefold_repetition()){
      win = 0.5
    }
    socket.emit("gameover", name, win)
    if(win == 1){
      status = "won"
    }else if(win == 0.5){
      status = "drawed"
    }else{
      status = "lost"
    }
    alert("You " + status)
}



