const socket=io();
let Username='';

document.getElementById('join-button').addEventListener('click',(event)=>{
    //To avoid loading of window after every click
    event.preventDefault();
   Username=document.getElementById('username-input').value;
   if(Username.trim()!==''){
    document.querySelector('.form-container').style.display='none';
    document.querySelector('.chatroom-container').style.display='block';
    console.log(Username);
   }
})
document.getElementById('send-button').addEventListener('click',(event)=>{
    event.preventDefault();
    const data={
        Username:Username,
        message:document.getElementById('message-input').value,
    }
    socket.emit('message',data);
    addMessagefn(data);
})

socket.on('message',(data)=>{
    if(data.Username!==Username){
        addMessagefnReceiving(data);
     }
    
})
function addMessagefn(data){
    var msgDiv=document.createElement('div');
    // msgDiv.innerText=`${data.Username}:${data.message}';
    msgDiv.innerText=`${data.Username}:${data.message}`;
    msgDiv.setAttribute('class','message outgoing');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value='';
}
function addMessagefnReceiving(data){
    var msgDiv=document.createElement('div');
    // msgDiv.innerText=`${data.Username}:${data.message}';
    msgDiv.innerText=`${data.Username}:${data.message}`;
    msgDiv.setAttribute('class','message incoming');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value='';
}