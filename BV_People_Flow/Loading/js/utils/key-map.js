function keyMap(){
  var maxKeyIndex = keys.length - 1;
  if (nextKey > maxKeyIndex) {
    goToNextPage();
    nextKey=0;
  }
}
var keys=[66, 86, 71, 79];
var nextKey = 0;
$(window).keydown((e) => {
  var key = e.which;
  if (key === keys[nextKey]) {
    nextKey++;
  } else {
    nextKey=0;
  }
  keyMap();
});