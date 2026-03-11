const API = "http://localhost:3000";

async function addNote(){

const data = {
title:document.getElementById("title").value,
subject:document.getElementById("subject").value,
description:document.getElementById("description").value
};

await fetch(API+"/notes",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
});

loadNotes();
}


async function loadNotes(){

const res = await fetch(API+"/notes");
const notes = await res.json();

let html="";

notes.forEach(n=>{

html += `
<div>
<h3>${n.title}</h3>
<p>${n.description}</p>
<button onclick="deleteNote('${n._id}')">Delete</button>
</div>
`;

});

document.getElementById("notes").innerHTML = html;

}

async function deleteNote(id){

await fetch(API+"/notes/"+id,{
method:"DELETE"
});

loadNotes();

}

loadNotes();