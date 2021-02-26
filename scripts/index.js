

document.getElementById('form').addEventListener('submit', addIssue);

function addIssue(e) {
  e.preventDefault();
  var desc = document.getElementById('description').value;
  var severe = document.getElementById('severity').value;
  var assign = document.getElementById('assignedto').value;
  var id = chance.guid();
  var status = `Open`;

  var issue = {
    id: id,
    description: desc,
    severity: severe,
    assignedto: assign,
    status: status
  }

  if (localStorage.getItem('issues') == null) {

    let issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    let issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('form').reset();

  fetchIssues();
}

function closeIssue(id) {
  let issues = JSON.parse(localStorage.getItem('issues'));

  for (var j = 0; j < issues.length; j++) {
    if (issues[j].id == id) {
      issues[j].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}
function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem('issues'));

  for (var j = 0; j < issues.length; j++) {
    if (issues[j].id == id) {
      issues.splice(j, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem('issues'));
  let issuesList = document.getElementById('list');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var description = issues[i].description;
    var severity = issues[i].severity;
    var assignedto = issues[i].assignedto;
    var status = issues[i].status;


    issuesList.innerHTML += '<div class="card">' +
      '<header>' +
      '<h3>' + description + '</h3>' +
      '<p><span id="toggle" class="open">' + status + '</span></p>' +
      '<h6>Issue ID:' + id + '</h6>' +
      '</header>' +
      '<section>' +
      '<p>' + '<i class="fas fa-hourglass-half"></i>' + severity + '</p>' +
      '<p>' + '<i class="fas fa-user"></i>' + assignedto + '</p><br/>' +
      '<button class="btn close-btn" onclick="closeIssue(\'' + id + '\')">Close</button>&nbsp;' +
      '<button class="btn delete-btn" onclick="deleteIssue(\'' + id + '\')">Delete</button>' +
      '</section>' +
      '</div>';
  }
}
