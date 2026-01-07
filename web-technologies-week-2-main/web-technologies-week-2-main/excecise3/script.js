function addTask() {
    const input = document.getElementById('taskName');
    if (!input.value) return;

    const card = document.createElement('div');
    card.id = 't-' + Date.now();
    card.className = 'task-card';
    card.draggable = true;
   
    card.ondragstart = (e) => {
        e.dataTransfer.setData("text", e.target.id);
    };

    const date = new Date().toLocaleDateString();
    card.innerHTML = `<strong>${input.value}</strong><small>${date}</small>`;

    document.getElementById('todo').appendChild(card);
    input.value = "";
}

function allow(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-hover');
}

function leave(e) {
    e.currentTarget.classList.remove('drag-hover');
}

function drop(e) {
    e.preventDefault();
    const col = e.currentTarget;
    col.classList.remove('drag-hover');
   
    const id = e.dataTransfer.getData("text");
    const card = document.getElementById(id);
   
    if (card) {
        col.appendChild(card);

        if (col.id === 'completed') {
            card.classList.add('completed-style');
            setTimeout(() => alert("Task Completed Successfully"), 50);
        } else {
            card.classList.remove('completed-style');
        }
    }
}