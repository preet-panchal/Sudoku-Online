var HighScores = [
    {"date": "2021/01/17", "duration": "3:41"},
    {"date": "2021/01/21", "duration": "4:01"},
    {"date": "2021/02/01", "duration": "2:52"},
    {"date": "2021/02/17", "duration": "3:08"},
    {"date": "2021/03/02", "duration": "2:51"}
];

window.onload = function() {

    var HighScoresTable = document.getElementById("score-board");
    CreateHighScoresTable(HighScoresTable);
};

// Creates the High Scores table
function CreateHighScoresTable(table){
    var tableHead = table.tHead;
    let th = document.createElement('th');
    th.innerHTML = "Date";
    tableHead.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = "Duration";
    tableHead.appendChild(th);
    var tableBody = table.getElementsByTagName("tbody")[0];
    for (let i = 0; i < HighScores.length; i++) {
        var tr = tableBody.insertRow();
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(HighScores[i]["date"]));
        td = tr.insertCell();
        td.appendChild(document.createTextNode(HighScores[i]["duration"]));
    }
    console.log(tableBody);
};