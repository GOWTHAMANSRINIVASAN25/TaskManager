var arr = [
    {
        category: 'personal-work',
        subcategory: 'project',
        duration: '01:00:01',
        task: 'Room Rent Management'
    },
    {
        category: 'work',
        subcategory: 'meeting',
        duration: '00:00:24',
        task: 'Game development'
    },
    {
        category: 'personal-work',
        subcategory: 'project',
        duration: '00:02:13',
        task: 'develop client application'
    },
    {
        category: 'work',
        subcategory: 'meeting',
        duration: '00:05:34',
        task: 'Review the feedback form'
    },
    {
        category: 'personal-work',
        subcategory: 'project',
        duration: '09:12:00',
        task: 'Design UI for new module'
    },
    {
        category: 'work',
        subcategory: 'meeting',
        duration: '02:08:15',
        task: 'project status update'
    }
];

var tableBody = document.getElementById("val");

function filtertable() {
    var select = document.getElementById("Category").value;
    console.log(select);
    tableBody.innerHTML = "";
    if (select === '') {
        arr.forEach(val => add(val));
    } else {
        var filsel = arr.filter(x => x.category === select);
        filsel.forEach(val => add(val));
    }
}

function add(obj) {
    var data = document.createElement('tr');

    var cat = document.createElement('td');
    cat.textContent = obj.category;
    data.appendChild(cat);

    var subcat = document.createElement('td');
    subcat.textContent = obj.subcategory;
    data.appendChild(subcat);

    var dur = document.createElement('td');
    dur.textContent = obj.duration;
    data.appendChild(dur);

    var tsk = document.createElement('td');
    tsk.textContent = obj.task;
    data.appendChild(tsk);

    var update = document.createElement("button");
    update.textContent = 'Update';
    update.className = 'update-btn'; 
    update.type = 'button';
    update.onclick = function () {
        document.querySelector('.task_form .category').value = obj.category;
        document.querySelector('.task_form .subcategory').value = obj.subcategory;
        document.querySelector('.task_form .duration').value = obj.duration;
        document.querySelector('.task_form .task').value = obj.task;

        updateIndex = Array.from(data.parentNode.children).indexOf(data);
        document.getElementById('submit_btn').textContent = 'Update';
    };
    data.appendChild(update);

    var deletebtn = document.createElement("button");
    deletebtn.textContent = "delete";
    deletebtn.className = 'delete-btn'; 
    deletebtn.type = 'button';
    deletebtn.onclick = function () {
        // Remove the row from the table and array
        var rowIndex = Array.from(data.parentNode.children).indexOf(data);
        arr.splice(rowIndex, 1);
        data.remove();
    };
    data.appendChild(deletebtn);
    tableBody.appendChild(data);
}

var updateIndex = -1; // To keep track of the index being updated, initially set to -1

document.getElementById('submit_btn').addEventListener('click', function (event) {
    event.preventDefault();
    var category = document.querySelector('.task_form .category').value;
    var subcategory = document.querySelector('.task_form .subcategory').value;
    var duration = stopwatchInput.value; // Get the value from the stopwatch
    var task = document.querySelector('.task_form .task').value;

    if (updateIndex === -1) {
        // Add new task
        add({
            category: category,
            subcategory: subcategory,
            duration: duration,
            task: task
        });
    } else {
        // Update task
        var updatedRow = tableBody.children[updateIndex];
        updatedRow.children[0].textContent = category;
        updatedRow.children[1].textContent = subcategory;
        updatedRow.children[2].textContent = duration;
        updatedRow.children[3].textContent = task;

        arr[updateIndex] = {
            category: category,
            subcategory: subcategory,
            duration: duration,
            task: task
        };

        updateIndex = -1;
        document.getElementById('submit_btn').textContent = 'Add new task';
    }

    document.querySelector('.task_form .category').reset();
    document.querySelector('task_form .subcategory').reset();
    document.querySelector('task_form .task').reset();
});

var startBtn = document.getElementById('start_btn');
var reset=document.getElementById('reset_btn');

var timerInterval;
var timerValue = 0;
var stopwatchInput = document.querySelector('.task_form .duration');
isrunning=false;
startBtn.addEventListener('click', function () {
    if(!isrunning){
    clearInterval(timerInterval);
    timerInterval = setInterval(function () {
        document.getElementById('start_btn').innerHTML="stop";
        isrunning=true;
        timerValue++;
        stopwatchInput.value = formatTime(timerValue);
      
    }, 1000);
}
else{
    isrunning=false;
    clearInterval(timerInterval);
    stopwatchInput.value = formatTime(timerValue);
    document.getElementById('start_btn').innerHTML="start";
}
});

reset.addEventListener('click',()=>{
    timerValue=0;
    clearInterval(timerInterval);
    document.getElementById('start_btn').innerHTML="start";
    stopwatchInput.value = formatTime(timerValue);
    isrunning=false;
})

function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = Math.floor(time % 60);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

filtertable();
