// select the elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// classes name for the TO-do list
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';


// variables
let LIST, id;

// get items from localstorage
let data = localStorage.getItem('TODO');

// check if data 
if (data) { 
    LIST = JSON.parse(data);
    id = LIST.length; // sets the id to the last in the list
    loadList(LIST);
}
else {
    LIST = [];
    id = 0;
}

// load saved items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

// show today's date
const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
};

const today = new Date();

// renders the date in the header
dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// add to do function
function addToDo(toDo, id, done, trash) {
    if (trash) {return ;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class= 'item'>
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
    `;
    const position = 'beforeend';
    list.insertAdjacentHTML(position, item);


}

// adds an item to the list when user presses the enter key
document.addEventListener('keyup', function(even) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // if the input isn't empty, add the To do
        if (toDo) {
            addToDo(toDo);

            // push the list input to the array
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // add items to localstorage (this code must be added where the LIST array is updated)
            localStorage.setItem('TODO', JSON.stringify(LIST)); 

            // increment the id 
            id++;
        }
        input.value = '';
    }
});

// addToDo("coffee", 1, false, false);

// complete button 
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do from list
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}


// target the items created dynamically
list.addEventListener('click', function(event) {
    const element = event.target; // returns the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == 'complete') {
        completeToDo(element);
    }
    else if (elementJob == 'delete') {
        removeToDo(element);
    }

    // add items to localstorage (this code must be added where the LIST array is updated)
    localStorage.setItem('TODO', JSON.stringify(LIST)); 
});

// clear the local storage
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});