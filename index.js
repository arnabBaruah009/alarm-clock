var curr_time = document.querySelector('#current-time span');
var alarm_set_time = document.querySelector('#set-time input[type=time]');
var alarm_set_text = document.querySelector('#set-time input[type=text]')
var set_button = document.querySelector('#set-time button');
var list = document.getElementById('list');
let alarms = [];

//showing current time
setInterval(() =>{
    let dt = new Date();
    let meridiem = dt.getHours() < 12 ? "AM" : "PM"
    let hour = dt.getHours() <= 12 ? dt.getHours() : dt.getHours()-12;
    curr_time.innerHTML = hour + dt.toTimeString().slice(2,9) + meridiem;
}, 100)

//trigger the alarm
setInterval(() =>{
    let now = new Date();
    for(alarm of alarms){
        if(alarm.time.toTimeString() == now.toTimeString()){
            alert(`Your alarm is off for "${alarm.text}"`);
        }
    }
}, 100);

//add alarm
set_button.addEventListener('click', () => {
    if(alarm_set_time.value == ''){
        alert("Please set a time");
        return;
    }
    addAlarm(alarm_set_time.value, alarm_set_text.value);
    alarm_set_time.value = "";
    alarm_set_text.value = "";
})

function addAlarm(data, text){
    let hr = parseInt(data.slice(0,2)) <= 12 ? parseInt(data.slice(0,2)) : parseInt(data.slice(0,2))-12;
    let min = parseInt(data.slice(3,5));
    let mer = parseInt(data.slice(0,2)) < 12 ? "AM" : "PM";
    var dt1 = new Date();
    dt1.setHours(hr,min,00);
    alarms.push({
        text: text,
        hour: hr,
        minute: min,
        meridiem: mer,
        time: dt1,
        id: Date.now().toString()
    });
    renderList();
}

//renderList
function  addAlarmstoList(alarm){
    const li = document.createElement('li');

    li.innerHTML = `
        <p>${alarm.hour}:${alarm.minute} ${alarm.meridiem}</p>
        <p>${alarm.text}</p>
        <p><i id=${alarm.id} class="fa-solid fa-delete-left"></i></p>
    `

    list.append(li);
}

function renderList(){
    list.innerHTML = ''

    for(let i=0; i<alarms.length; i++){
        addAlarmstoList(alarms[i]);
    }
}

//delete alarm
function deleteAlarm(alarmID){
    let newList = alarms.filter(function (alarm){
        return alarm.id !== alarmID
    })

    alarms = newList;
    renderList();
}

function handleClick(e){
    const target = e.target;
    if(target.classList.contains('fa-solid')){
        deleteAlarm(target.id);
        return;
    }
}

document.addEventListener('click', handleClick);