let raw_data=[];


function CreateTble(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td><button onclick="editLine(${line.id});">edit</button></td>`;
        str+="<td>"+line.id+"</td>";
        str+="<td>"+line.themeName+"</td>";
        str+="<td>"+line.BackroundColor+"</td>";
        str+="<td>"+line.TextColor+"</td>";
        str+=`<td><button onclick="deleteLine(${line.id});">delete</button></td>`;
        str+="</tr>";
    }
    document.getElementById("mainTable").innerHTML=str;
}

async function getList() {
    let response = await fetch('/List');
// console.log("response=",response);
    let data = await response.json();
    console.log("data=",data);
    raw_data = data;
    CreateTble();
}

async function addNewLine() {
    let themeName=document.getElementById("themeName").value;
    let BackroundColor=document.getElementById("BackroundColor").value;
    let TextColor=document.getElementById("TextColor").value;
    let response = await fetch('/Add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({themeName: themeName, BackroundColor: BackroundColor, TextColor: TextColor})
        }
    );
// let data = await response.json();
// console.log(data);
    getList();
}
async function deleteLine(id) {
    //let Name= id;
    let objToServer={};
    objToServer.idx=id;
    let response = await fetch('/Delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
// let data = await response.json();
// console.log(data);
    getList();
}
async function editLine(id) {
    let objToServer={};
    objToServer.idx=id;
    objToServer.themeName=document.getElementById("themeName").value;
    objToServer.BackroundColor=document.getElementById("BackroundColor").value;
    objToServer.TextColor=document.getElementById("TextColor").value;
    let response = await fetch('/Edit', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
// let data = await response.json();
// console.log(data);
    getList();
}

getList();