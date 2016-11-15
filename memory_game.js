function Card(num){
  this.url= "images/monsters-"+ num+".png";
  this.open = false;
  this.matched = false;
}
function Board(){
  this.protoboard = [];
  this.board = [];
  this.size= 0;
}

Board.prototype.makeBoard = function(board_size) {
    var num = (board_size / 2);
    var randNums = [];
    for (var i = 0; i < num; i++) {
      var rand = Math.floor(Math.random() * 16) + 1;
      randNums.push(rand);
      console.log(randNums);
      if (randNums.indexOf(rand) === -1) {
      }
      this.protoboard.push(new Card(rand));
      this.protoboard.push(new Card(rand));
      console.log(this.protoboard);
    }
    shuffle(this.protoboard);
    if (8) {
    var easyboard1 = this.protoboard.splice(0, num);
    this.board.push(easyboard1);
    this.board.push(this.protoboard);
    }
    else if (18) {
      var mediumboard1 = this.protoboard.splice(0, 6);
      var mediumboard2 = this.protoboard.splice(0, 6);
      this.board.push(mediumboard1);
      this.board.push(mediumboard2);
      this.board.push(this.protoboard);
    }
    else if (32) {
      var hardboard1 = this.protoboard.splice(0, 8);
      var hardboard2 = this.protoboard.splice(0, 8);
      var hardboard3 = this.protoboard.splice(0, 8);
      this.board.push(hardboard1);
      this.board.push(hardboard2);
      this.board.push(hardboard3);
      this.board.push(this.protoboard);
    }
    this.board.size = num;
  };

function shuffle(board) {
   var i = 0;
   var j = 0;
   var temp = null;

   for (i = board.length - 1; i > 0; i--) {
     j = Math.floor(Math.random() * (i + 1));
     temp = board[i];
     board[i] = board[j];
     board[j] = temp;
   }
  }

var app = angular.module('my-app', []);
app.controller('memoryGame', function($scope, $timeout){

$scope.chooseGame = function(){
  $scope.chosen = true;
};

$scope.newGame = function(x){
  $scope.board = new Board();
  if(x === 'easy'){
    $scope.board.makeBoard(8);
  }
  else if(x === 'medium'){
    $scope.board.makeBoard(18);
  }
  else if(x === 'hard'){
    $scope.board.makeBoard(32);
  }
  $scope.state = 0;
  $scope.matches = [];
  $scope.firstcard = {};
  $scope.win_count = 0;
  $scope.winner = false;
  $scope.chosen = false;
};

$scope.checkWinner = function(){
  if($scope.win_count === $scope.board.board.size){
  $scope.winner = true;
  }
};

  $scope.chooseGame();
  $scope.clicked = function(item) {
    if (item.open === false && $scope.state === 0) {
      item.open = true;
      $scope.state++;
      $scope.matches.push(item.url);
      $scope.firstcard = item;
    }
    if (item.open === false && $scope.state === 1) {
      item.open = true;
      $scope.state++;
      $scope.matches.push(item.url);
    }
    if ($scope.state === 2 && item.open === true) {
      $timeout(function(){
        if ($scope.matches[0] === $scope.matches[1]){
          item.matched = true;
          $scope.firstcard.matched = true;
          $scope.win_count ++;
          $scope.checkWinner();
          $scope.state = 0;
          $scope.matches = [];
          $scope.firstcard = {};

        }
        else{
          item.open = false;
          $scope.firstcard.open = false;
          $scope.state = 0;
          $scope.matches = [];
          $scope.firstcard = {};
        }
      },1300);
    }
  };
});
