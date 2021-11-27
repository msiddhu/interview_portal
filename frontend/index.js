


function getPersons(){
        var request=new XMLHttpRequest();
        let url='http://127.0.0.1:5000/list/persons'
        console.log(url)
        request.open('GET',url,true);
        request.send();
        request.onload=function(){
                document.getElementById("viewTable").innerHTML=""
                var res=JSON.parse(this.response);
                res=res.data;
                
                let table=document.createElement("table");
                table.cellPadding="15"
                table.align="center";
                table.border="1";
                table.className="table-striped table-hover"
                let row=table.insertRow(-1)
                row.style.color="blue"
                row.style.backgroundColor="lightcoral"
                row.align="center";
                let email=row.insertCell(-1)
                let name=row.insertCell(-1)

                email.style.width="100%"
                name.style.width="30%" 
                email.innerHTML="Email ID"
                name.innerHTML="Person Name"

                res.forEach(element => {
                        let row1=table.insertRow(-1);
                        row1.align="center";
                        row1.style.color="maroon";

                        let name1=row1.insertCell(-1);
                        let email1=row1.insertCell(-1);
                        email1.style.width="40%"
                        name1.style.width="30%" 
                        email1.innerHTML=element.email;
                        name1.innerHTML=element.name;

                });
                tab=document.getElementById("viewTable")
                tab.append(table);
        }

}




function getInterviews(){
        var request=new XMLHttpRequest();
        let url='http://127.0.0.1:5000/list/interviews'
        console.log(url)
        request.open('GET',url,true);
        request.send();
        request.onload=function(){
                document.getElementById("viewTable").innerHTML=""
                document.getElementById("interviewbody").innerHTML=""
                var res=JSON.parse(this.response);
                res=res.data;
                console.log(res);
                let table=document.createElement("table");
                table.cellPadding="15"
                table.align="center";
                table.border="1";
                // table.className="table-responsive-sm table-hover"
                let row=table.insertRow(-1)
                row.style.color="blue"
                row.style.backgroundColor="lightcoral"
                row.align="center";


                let start_time=row.insertCell(-1)
                let end_time=row.insertCell(-1)
                let participants=row.insertCell(-1)
                let edit_interview=row.insertCell(-1);


                start_time.style.width="100%"
                end_time.style.width="100%" 
                participants.style.width="100%" 
                edit_interview.style.width="100%" 


                start_time.innerHTML="Start Time";
                end_time.innerHTML="End Time";
                participants.innerHTML="Participants List";
                edit_interview.innerHTML="Edit Interview";


                res.forEach(element => {
                        let row1=table.insertRow(-1);
                        row1.align="center";
                        row1.style.color="maroon";

                        let start_time1=row1.insertCell(-1);
                        let end_time1=row1.insertCell(-1);
                        let participants1=row1.insertCell(-1);
                        let edit_interview1=row1.in

                        
                        start_time1.innerHTML=element.email;
                        end_time1.innerHTML=element.name;
                        participants1.innerHTML=element.participants.toString();
                        edit_interview.innerHTML=element.interview_id;
                }
                );
                tab=document.getElementById("viewTable")
                tab.append(table);
        }

}

async function getAllUsers(){
        var request=new XMLHttpRequest();
        let url='http://127.0.0.1:5000/list/persons';
        console.log(url)
        request.open('GET',url,true);
        request.send();
        var result;
        request.onload=function(){
                var res=JSON.parse(this.response);
                result=res.data;
                console.log(result);
        }
        return result;

}

async function createInterviewButton(){

        var form = document.createElement("form");
        form.setAttribute('id','form1');
        

        var startTime = document.createElement("input");
        startTime.setAttribute("type", "datetime-local");
        startTime.setAttribute("id", "start_time");
        startTime.setAttribute("name", "start");


        var endTime = document.createElement("input");
        endTime.setAttribute("type", "datetime-local");
        endTime.setAttribute("id", "end_time");
        endTime.setAttribute("name", "end");

        var dropdown1 =document.createElement("select");
        dropdown1.setAttribute("style","width:100px");
        dropdown1.setAttribute("name","person1");
        dropdown1.setAttribute("id","persons_list1");
        

        var dropdown2 =document.createElement("select");
        dropdown2.setAttribute("style","width:100px");
        dropdown2.setAttribute("name","person2");
        dropdown2.setAttribute("id","persons_list2");
        

        var request=new XMLHttpRequest();
        let url='http://127.0.0.1:5000/list/persons'
        console.log(url)
        request.open('GET',url,true);
        request.send();
        request.onload=function(){
                var res=JSON.parse(this.response);
                var data=res.data;
                console.log(res);
        


                data.forEach(element=>{

                        var option1=document.createElement("option");
                        textnode1=document.createTextNode(element.name);
                        option1.setAttribute('value',element.email);
                        option1.setAttribute("text",element.name);
                        option1.appendChild(textnode1);
                        dropdown1.appendChild(option1);

                        var option2=document.createElement("option");
                        textnode2=document.createTextNode(element.name);
                        option2.setAttribute('value',element.email);
                        option2.setAttribute("text",element.name);
                        option2.appendChild(textnode2);
                        dropdown2.appendChild(option2);
                })
              

        }
                      
        var submit=document.createElement("button");
        submit.setAttribute("type","button");
        submit.setAttribute("value","Submit");
        submit.setAttribute("onclick","createInterview()");


        var br = document.createElement("br"); 

        form.appendChild(startTime);
        form.appendChild(br);

        form.appendChild(endTime);
        form.appendChild(br.cloneNode());
        
        form.appendChild(dropdown1);
        form.appendChild(br.cloneNode());


        form.appendChild(dropdown2);
        form.appendChild(br.cloneNode());
        
        form.appendChild(submit);
        form.appendChild(br.cloneNode());

        document.getElementById('interviewbody').appendChild(form); 

}


function createInterview(){
        // const form = document.querySelector('form');
        // const data = Object.fromEntries(new FormData(form).entries());
        // console.log(data);
        // console.log('heelo');

        // var request=new XMLHttpRequest();
        // let url='http://127.0.0.1:5000/interview/create';
        // request.
        // request.open('GET',url,true);


        const url = "http://127.0.0.1:5000/interview/create";
        formData=new FormData(document.getElementById("form1"));

        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var gh = JSON.stringify(object);
        console.log(gh);
        fetch(url, {
    method : "POST",
    contentType:'application/json',
    body: gh,
}).then(
    response => response.text() // .json(), etc.
    // same as function(response) {return response.text();}
).then(
    html => console.log(html)
);


}