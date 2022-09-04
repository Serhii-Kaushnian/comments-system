document.body.style.backgroundColor = '#cbb000';
let comments = [];
// loadComments();
let submitBtnEl = document.getElementById('comment-add');
submitBtnEl.addEventListener('click', extractCommenrFromInput);
function extractCommenrFromInput(event) {
    event.preventDefault();
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');
    let comment = {
        name: commentName.value,
        body: commentBody.value,
        time: Math.floor(Date.now() / 1000),
    };
    console.log('comment: ', comment);
    comments.push(comment);
    commentName.value = '';
    commentBody.value = '';
    saveComments();
    showComments();
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}
//Function below saves all comments to local storage and shows them after page reset
// function loadComments() {
//     if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
//     showComments();
// }

function showComments() {
    let commentField = document.getElementById('comment-field');
    let output = '';
    comments.forEach(function (item) {
        let { name, body, time } = item;
        if (!name || !body) {
            return;
        }
        output += `<p class="text-right small">${timeConverter(time)}</p>`;
        output += `<p class="alert alert-primary">Name: ${name}</p>`;
        output += `<p class="alert alert-success">Comment: ${body}</p>`;
    });
    commentField.innerHTML = output;
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];

    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
