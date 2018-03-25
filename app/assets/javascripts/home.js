document.addEventListener('turbolinks:load', function(){
  var graphBars = document.getElementsByClassName('graph-bar');
  var whiteBg = document.getElementsByClassName('graph-white-bg')[0];
  var maxHeight = whiteBg.innerHeight;
  var balanceArray = [];
  for (var i = 0; i < graphBars.length; i++) {
    var bar = graphBars[i];
    var balance = bar.getAttribute('data-balance');
    balanceArray.push(balance);
    if (balance < 0) { whiteBg.style.paddingBottom = "10px" };
  };
  balanceArray = balanceArray.sort(function(a, b){return b-a});
  var highestBalance = parseInt(balanceArray[0]);
  var lowestBalance = parseInt(balanceArray[balanceArray.length-1]);
  var totalSection = lowestBalance < 0 ? highestBalance + Math.abs(lowestBalance) : highestBalance;
  var upperPart = highestBalance/totalSection;
  var lowerPart = Math.abs(lowestBalance/totalSection);
  var upperPartHeight = whiteBg.offsetHeight * upperPart - document.getElementsByClassName('graph-names')[0].offsetHeight;
  var lowerPartHeight = whiteBg.offsetHeight * lowerPart - document.getElementsByClassName('graph-names')[0].offsetHeight;
  for (var i = 0; i < graphBars.length; i++) {
    var bar = graphBars[i];
    var balance = bar.getAttribute('data-balance');
    if (balance > 0) {
      var heightPercentage = balance / highestBalance;
      var heightCSS = (upperPartHeight * heightPercentage);
      bar.style.height = heightCSS + "px";
    } else if (balance < 0) {
      var heightPercentage = balance / lowestBalance;
      var heightCSS = (lowerPartHeight * heightPercentage);
      bar.style.height = heightCSS + "px";
    }
  }

  var selectBoxes = document.getElementsByClassName('spreadsheet-select-box select-body');
  var graphBars = document.getElementsByClassName('graph-bar');
  addHighlight(selectBoxes);
  addHighlight(graphBars);
}, false);

function addHighlight(selectBoxes) {
  for (var i = 0; i < selectBoxes.length; i ++) {
    selectBoxes[i].addEventListener('mouseover', function(e) {
      var spreadsheetID = this.getAttribute('data-spreadsheet-id');
      var spreadsheetElements = document.querySelectorAll("[data-spreadsheet-id='"+spreadsheetID+"']")
      for (var i = 0; i < spreadsheetElements.length; i++) {
        spreadsheetElements[i].classList.add('highlighted');
      }
    })

    selectBoxes[i].addEventListener('mouseout', function(e) {
      var spreadsheetID = this.getAttribute('data-spreadsheet-id');
      var spreadsheetElements = document.querySelectorAll("[data-spreadsheet-id='"+spreadsheetID+"']")
      for (var i = 0; i < spreadsheetElements.length; i++) {
        spreadsheetElements[i].classList.remove('highlighted');
      }
    });
  }
}
