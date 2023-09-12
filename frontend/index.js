let form = document.querySelector("form");

form.addEventListener("submit", (e)=>{

     e.preventDefault()

     console.log("hello")
     let option = document.getElementById("choose-options").value;
     let value= document.getElementById("topic").value; 
     console.log(option,value)

     if(option=="item-selected"){
 
        alert("Please choose the category")
     }else if(value==""){
        alert("Please enter the Topic")
     }else{

        const baseUrl = "http://localhost:4500/search-data"
     const url= `${baseUrl}?option=${option}$value=${value}`
     console.log(url)

     fetch(url, {
        method:"POST",
     }).then((res)=>{return res.json()}).then((data)=>{

         console.log(data);
         displayData(data)
     }).catch((err)=>{
        console.log(err)
     })

     }
     
})

let div = document.querySelector(".data-div")
function displayData(data){

        div.innerHTML=null;

        let p = document.createElement("p")
        p.innerText=data.result;
        div.append(p)
}

  
//     // Construct the URL with the selected option and input value
//     const baseUrl = "https://example.com/api"; // Replace with your base URL
//     const url = `${baseUrl}?option=${selectValue}&value=${inputValue}`;
  
//     // Display the generated URL
//     document.getElementById("generatedURL").textContent = url;
//   }
  