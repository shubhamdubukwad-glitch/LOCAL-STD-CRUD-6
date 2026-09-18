var cl = console.log;

const stdForm = document.getElementById('stdForm');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const rollNO = document.getElementById('rollNO');
const JOB = document.getElementById('JOB');
const salary = document.getElementById('salary');
const addstdBtn = document.getElementById('addstdBtn');
const UpdatestdBtn = document.getElementById('UpdatestdBtn')
const stdcontainer = document.getElementById('stdcontainer');


//std-array (DATABASE)
// let stdArr = [
//     {
//         fname: "shubham",
//         lname: 'dubukwad',
//         rollNO: 25,
//         JOB: "wed-developer",
//         salary: 65000,
//         id: "321"
//     },
//     {
//         fname: "vinod",
//         lname: 'patil',
//         rollNO: 25,
//         JOB: "backend-developer",
//         salary: 235000,
//         id: "3651"
//     },
//     {
//         fname: "kishor",
//         lname: 'landge',
//         rollNO: 25,
//         JOB: "fulstack-developer",
//         salary: 45000,
//         id: "431"
//     }
// ];
// localStorage.setItem('stdArr',JSON.stringify(stdArr))

//READ-STD//
let stdjson = localStorage.getItem('stdArr')
// cl(stdjson)

let stdArr = JSON.parse(localStorage.getItem('stdArr'))
// cl(stdArr)


function readstd(arr) {
    let result = '';
    arr.forEach((ele, i) => {
        result += `<tr id="${ele.id}">
                                <td>${i + 1}</td>
                                <td>${ele.fname}</td>
                                <td>${ele.lname}</td>
                                <td>${ele.rollNO}</td>
                                <td>${ele.JOB}</td>
                                <td>${ele.salary}</td>  
                               <td>
                                <i onclick="editstd(this)" class="fa-solid fa-user-pen fa-2x text-primary" role="button" data-id="${ele.id}" ></i>
                                </td>
                               <td>
                                 <i onclick="deletestd(this)" class="fa-solid fa-user-xmark fa-2x text-danger" role="button" data-id="${ele.id}" ></i>
                                 </td>
                            </tr>`;
    });
    stdcontainer.innerHTML = result;
}
readstd(stdArr);

//CREATE-STD//
function oncreatestd(eve) {
    eve.preventDefault()
    cl(eve)
    let CREATE_OBJ = {
        fname: fname.value,
        lname: lname.value,
        rollNO: rollNO.value,
        JOB: JOB.value,
        salary: salary.value,
        id: Date.now().toString()
    }
    stdArr.push(CREATE_OBJ);
    stdForm.reset()
    localStorage.setItem('stdArr', JSON.stringify(stdArr))
    let tr = document.createElement('tr');
    tr.innerHTML = `              <td>${stdArr.length}</td>
                                <td>${CREATE_OBJ.fname}</td>
                                <td>${CREATE_OBJ.lname}</td>
                                <td>${CREATE_OBJ.rollNO}</td>
                                <td>${CREATE_OBJ.JOB}</td>
                                <td>${CREATE_OBJ.salary}</td>  
                               <td>
                                <i onclick="editstd(this)" class="fa-solid fa-user-pen fa-2x text-primary" role="button" data-id="${CREATE_OBJ.id}" ></i>
                                </td>
                                 <td>
                                    <i onclick="deletestd(this)" class="fa-solid fa-user-xmark fa-2x text-danger" role="button" data-id="${CREATE_OBJ.id}" ></i>
                                </td>
                            </tr>`;
    stdcontainer.append(tr)


    swal.fire({
        title: `STD-CREATE SUCCESSFULLY..!!`,
        text: `your student information created has been successfully..!!`,
        icon: `success`,
        timer: 1800
    })

}

//DELETE-STD//
function deletestd(ele) {
    let DELETE_ID = ele.closest('tr').id;
    let getconfermation = confirm(`are you sure can delete tour student information ${DELETE_ID}`);
    if (getconfermation) {
        let getIndex = stdArr.findIndex(p => p.id === DELETE_ID)
        stdArr.splice(getIndex, 1);
        ele.closest('tr').remove();
        localStorage.setItem('stdArr', JSON.stringify(stdArr))
        let allrows = document.querySelectorAll('#stdcontainer tr td:first-child');
        allrows.forEach((ele, i) => { ele.innerText = i + 1 })
        swal.fire({
            title: `STD-DELETE SUCCESSFULLY..!!`,
            text: `your student information deleted has been successfully..!!`,
            icon: `success`,
            timer: 1800
        })
    }
}

//EDIT-STD//
function editstd(ele) {
    let EDIT_ID = ele.closest('tr').id;
    localStorage.setItem('EDIT_ID', EDIT_ID)
    let EDIT_OBJ = stdArr.find(p => p.id === EDIT_ID)
    fname.value = EDIT_OBJ.fname;
    lname.value = EDIT_OBJ.lname;
    rollNO.value = EDIT_OBJ.rollNO;
    JOB.value = EDIT_OBJ.JOB;
    salary.value = EDIT_OBJ.salary;

    addstdBtn.classList.add('d-none');
    UpdatestdBtn.classList.remove('d-none');

}

//UPDATE-STD//
function onupdatestd() {
    let UPDATE_ID = localStorage.getItem('EDIT_ID');
    localStorage.removeItem('EDIT_ID')
    let UPDATE_OBJ = {
        fname: fname.value,
        lname: lname.value,
        rollNO: rollNO.value,
        JOB: JOB.value,
        salary: salary.value,
        id: UPDATE_ID
    }
    let getIndex = stdArr.findIndex(p => p.id === UPDATE_ID)
    stdArr[getIndex] = UPDATE_OBJ;
    localStorage.setItem('stdArr', JSON.stringify(stdArr))
    
    let tr = document.getElementById(UPDATE_ID).children
    tr[1].innerText = UPDATE_OBJ.fname;
    tr[2].innerText = UPDATE_OBJ.lname;
    tr[3].innerText = UPDATE_OBJ.rollNO;
    tr[4].innerText = UPDATE_OBJ.JOB;
    tr[5].innerText = UPDATE_OBJ.salary;

    stdForm.reset()
    addstdBtn.classList.remove('d-none');
    UpdatestdBtn.classList.add('d-none');


    swal.fire({
        title: `STD-UPDATE SUCCESSFULLY..!!`,
        text: `your student information updated has been successfully..!!`,
        icon: `success`,
        timer: 1800
    })
}

stdForm.addEventListener('submit', oncreatestd);
UpdatestdBtn.addEventListener('click', onupdatestd);
