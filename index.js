let editRowElement;

const fill = () =>{
    fetch('data.json')
    .then((response)=>response.json())
    .then(data=>{
        data.forEach(element => {
        const id = element.id;
        document.getElementById("tablebody").innerHTML += `<tr id="row${id}">
        <td><div class="row${id}">${element.fname}</div></td>
        <td><div class="row${id}">${element.mname}</div></td>
        <td><div class="row${id}">${element.lname}</div></td>
        <td><div class="row${id}">${element.email}</div></td>
        <td><div class="row${id}">${element.phoneno}</div></td>
        <td><div class="row${id}">${element.role}</div></td>
        <td><div class="row${id}">${element.address}</div></td>
        <td><button id="editRow${id}" type="button" onclick="editRow(${id})" class="btn btn-success">Edit</button></td>
        <td><button id="deleteRow${id}" type="button" onclick="deleteData(${id})" class="btn btn-danger delete${id}">Delete</button></td>
        </tr>`;        
    });
});
};

const editRow = (rowId) =>{
    const row = document.getElementsByClassName("row"+rowId);
    editRowElement = [];
    for (let i = 0; i < row.length; i++) {
        row[i].contentEditable= true;
        editRowElement.push(row[i].innerHTML);
    }
    const editButton = document.getElementById("editRow"+rowId);
    editButton.innerHTML = "Save";
    editButton.setAttribute("onclick","saveRow("+rowId+")");

    const deleteButton = document.getElementById("deleteRow"+rowId);
    deleteButton.innerHTML = "Cancel";
    deleteButton.setAttribute("onclick","cancelRowEdit("+rowId+")");
};

const cancelRowEdit = (id) =>{
    let row = document.getElementsByClassName("row"+id);
    for (let i = 0; i < row.length; i++) {
        row[i].innerHTML=editRowElement[i];
        row[i].contentEditable=false;
    }
    const editButton = document.getElementById("editRow"+id);
    editButton.innerHTML = "Edit";
    editButton.setAttribute("onclick","editRow("+id+")");

    const deleteButton = document.getElementById("deleteRow"+id);
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("onclick","deleteData("+id+")");
};

const saveRow = (id) =>{
    const row = document.getElementsByClassName("row"+id);
    for (let i = 0; i < row.length; i++) {
        row[i].contentEditable=false;
    }
    const editButton = document.getElementById("editRow"+id);
    editButton.innerHTML = "Edit";
    editButton.setAttribute("onclick","editRow("+id+")");

    const deleteButton = document.getElementById("deleteRow"+id);
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("onclick","deleteData("+id+")");
};

const deleteData = (id) =>{
    const rowId = document.getElementById("row"+id);
    rowId.remove();
};

const loadData = () =>{
    fill();
    document.getElementById("loadData").innerHTML = "Refresh Data";
    document.getElementById("loadData").id = "refreshData";
    document.getElementById("refreshData").setAttribute("onclick","refreshData()");
};

const refreshData = () =>{
    document.getElementById("tablebody").innerHTML="";
    fill();
}