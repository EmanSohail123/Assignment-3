

const ApiUrl="https://jsonplaceholder.typicode.com/todos/";
const responsemessage=document.getElementById("Response-Message");
const allbtn=document.getElementById("btn");
const userBtn=document.getElementById("userbtn");
const userinput=document.getElementById("num");

allbtn.addEventListener("click",()=>{
    responsemessage.innerHTML="";

fetch(ApiUrl)
.then((response)=>
{
   return response.json();
})
.then((data)=>{
    data.forEach((todo) => displaytodo(todo));
        
    })
.catch((error) => {
      console.error("Error fetching todos:", error);
      responsemessage.innerHTML = "<p>Failed to fetch data from API</p>";
    });
});

userBtn.addEventListener("click",()=>{
    const userId=(userinput.value);

    if(userId<1||userId>10)
    {
        alert("Please enter valid ID between 1 and 10");
         return;
    }

responsemessage.innerHTML="";
fetch(ApiUrl)
.then((response)=>{
    return response.json();
})
.then((data)=>{
    const filtered=data.filter((todo)=>todo.userId == userId);
    if(filtered.length===0)
    {
        responsemessage.innerHTML=`<p> No todos found for user ID ${userId}</p>`;
    }else{
        filtered.forEach((todo)=>displaytodo(todo));
    }
})
.catch((error) => {
            console.error("Error fetching todos:", error);
            responsemessage.innerHTML = "<p>Failed to fetch data from API</p>";
        });

});
  
function displaytodo(todo){
     const todoContainer=document.createElement("div");
        const title=document.createElement("p");
        const userId=document.createElement("p");
        const completed=document.createElement("p");
        
        todoContainer.style.border="1px solid black";
        todoContainer.style.borderBottom=`4px solid ${todo.completed?" green":"  red"}`;
        todoContainer.style.margin="10px";
        todoContainer.style.padding="10px";
        

        title.innerHTML=`<h4><strong> ${todo.title}</strong></h4>`;
        userId.innerHTML=`UserID: ${todo.userId}`;
        completed.innerHTML=`Is Completed: ${todo.completed}`;

        todoContainer.appendChild(title);
        todoContainer.appendChild(userId);
        todoContainer.appendChild(completed);
      

        responsemessage.appendChild(todoContainer);

     
}

