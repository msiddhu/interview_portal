//the idea was to make modules and seperate the functions.

const devurl='http://127.0.0.1:5000'
const produrl='https://interviewbackend45.herokuapp.com/'
let baseurl=produrl;

function getPersons(){
        var request=new XMLHttpRequest();
        let url=baseurl+'/list/persons'
        console.log(url)
        request.open('GET',url,true);
        request.send();
        request.onload=function(){
                clearAll();
                var res=JSON.parse(this.response);
                res=res.data;
                console.log(res);
                let table=document.createElement("table");
                table.cellPadding="30"
                table.cellSpacing="20"
                table.align="center";
                 table.border="1.5";
                table.className="table table-lg"
                let row=table.insertRow(-1)
                row.style.color="blue"
                row.style.backgroundColor="lightcoral"
                row.align="center";
                let email=row.insertCell(-1)
                let name=row.insertCell(-1)

                email.style.width="100%"
                name.style.width="30%" 
                email.innerHTML="Person Name"
                name.innerHTML="Email Id"

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
                document.getElementById('pagetitle').innerHTML="Participants"
        }
}

function getInterviews(){
        var request=new XMLHttpRequest();
        let url=baseurl+'/list/interviews'
        console.log(url)
        request.open('GET',url,true);
        request.send();
        request.onload=function(){
                clearAll();
                var res=JSON.parse(this.response);
                res=res.data;
                console.log(res);
                let table=document.createElement("table");
                table.cellPadding="10"
                table.align="center";
                table.border="1";
                table.className="table table-lg"
                let row=table.insertRow(-1)
                row.style.color="black"
                row.style.backgroundColor="lightcoral"
                row.align="center";


                let start_time=row.insertCell(-1)
                let end_time=row.insertCell(-1)
                let participants=row.insertCell(-1)
                let edit_interview=row.insertCell(-1);
                let delete_interview=row.insertCell(-1);


                start_time.style.width="30%"
                end_time.style.width="30%" 
                participants.style.width="50%" 
                edit_interview.style.width="30%" 
                delete_interview.style.width="30%" 


                start_time.innerHTML="Start Time";
                end_time.innerHTML="End Time";
                participants.innerHTML="Participants List";
                edit_interview.innerHTML="Edit Interview";
                delete_interview.innerHTML="Delete Interview";


                res.forEach(element => {
                        let row1=table.insertRow(-1);
                        row1.align="center";
                        row1.style.color="maroon";

                        let start_time1=row1.insertCell(-1);
                        let end_time1=row1.insertCell(-1);
                        let participants1=row1.insertCell(-1);
                        let edit_interview1=row1.insertCell(-1);
                        let delete_interview1=row1.insertCell(-1);

                        start_time1.innerHTML=element.start;
                        end_time1.innerHTML=element.end;
                        var parti_string="";
                        element.participants.forEach(parti=>{
                                console.log(parti.name);
                                parti_string=parti_string+parti.name+"<br>";
                                console.log(parti_string);
                        });
                        participants1.innerHTML=parti_string;
                        editButton=document.createElement("button");
                        editButton.setAttribute("type","button");
                        editButton.setAttribute("id","editbutton");
                        editButton.setAttribute("name"," Edit Button");
                        buttontextnode=document.createTextNode("Edit");
                        editButton.appendChild(buttontextnode);
                        editButton.setAttribute("value",element.interview_id);
                        editButton.setAttribute("onclick","editInterviewForm('"+element.interview_id+"')");
                        edit_interview1.appendChild(editButton);

                        deleteButton=document.createElement("button");
                        deleteButton.setAttribute("type","button");
                        deleteButton.setAttribute("id","deletebutton");
                        deleteButton.setAttribute("name","Delete Button");
                        deletebuttontextnode=document.createTextNode("Delete");
                        deleteButton.appendChild(deletebuttontextnode);
                        deleteButton.setAttribute("onclick","deleteInterview('"+element.interview_id+"')");
                        delete_interview1.appendChild(deleteButton);


                }
                );
                tab=document.getElementById("viewTable")
                tab.append(table);
                document.getElementById('pagetitle').innerHTML="Upcoming interviews"
        }          
}

function editInterviewForm(interview_id){
       // var interview_id=document.getElementById('editbutton').value; 
       console.log(interview_id);
        clearAll();
        const url = baseurl+'/list/interview/'+interview_id;
        fetch(url, {
                method : "GET",
            }).then(
                res => {
                       
                        return res.json()
                }
            ).then((response)=>{
                    var data=JSON.stringify(response);
                    var jsondata=JSON.parse(data).data;
                    console.log(jsondata);

                    var form = document.createElement("form");
                    form.setAttribute('id','form1');

                    var end=jsondata.end;
                    var start=jsondata.start;
                    var person1=jsondata.participants[0].email;
                    var person2=jsondata.participants[1].email;
                    var startTime=createHtmlObject("input","datetime-local","start_time","start","","",start);
                    var endTime=createHtmlObject("input","datetime-local","end_time","end","","",end);
                    var dropdown1=createHtmlObject("select","","persons_list1","person1","width:150px","",person1);        
                    var dropdown2=createHtmlObject("select","","persons_list2","person2","width:150px","" ,person2);

                    var request=new XMLHttpRequest();
                    let url=baseurl+'/list/persons'
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
                                    if(person1==element.email){
                                            option1.setAttribute("selected",true);
                                    }
                                    option1.appendChild(textnode1);
                                    dropdown1.appendChild(option1);
            
                                    var option2=document.createElement("option");
                                    textnode2=document.createTextNode(element.name);
                                    option2.setAttribute('value',element.email);
                                    option2.setAttribute("text",element.name);
                                    if(person2==element.email){
                                        option2.setAttribute("selected",true);
                                        }
                                    option2.appendChild(textnode2);
                                    dropdown2.appendChild(option2);
                            })
                          
            
                    }
                                  
                    var submit=document.createElement("button");
                    submit.setAttribute("type","button");
                    buttontextnode=document.createTextNode("Edit Interview");
                    submit.appendChild(buttontextnode);
                    submit.setAttribute("value","Submit");
                    submit.setAttribute("onclick","editInterview()");
            
                    var br = document.createElement("br"); 
                    var h5=document.createElement("h5");
                starttext=h5.cloneNode();
                endtext=h5.cloneNode();
                person1text=h5.cloneNode();
                person2text=h5.cloneNode();
                
                starttext.innerHTML="Start Time";
                endtext.innerHTML="End Time";
                person1text.innerHTML="Participant 1";
                person2text.innerHTML="Participant 2";

                    form.appendChild(starttext);
                    form.appendChild(startTime);
                    form.appendChild(br);

                    form.appendChild(endtext);
                    form.appendChild(endTime);   
                    form.appendChild(br.cloneNode());

                    form.appendChild(person1text);
                    form.appendChild(dropdown1);
                    form.appendChild(br.cloneNode());
                    
                    form.appendChild(person2text);
                    form.appendChild(dropdown2);
                    form.appendChild(br.cloneNode());
                    form.appendChild(br.cloneNode()); 
                    
                    form.appendChild(submit);
                    form.appendChild(br.cloneNode());
                    document.getElementById('interview_id').innerHTML="Interivew id:"+ interview_id;
                    document.getElementById('interview_id').value=interview_id;
                    document.getElementById('interviewbody').appendChild(form); 
                    document.getElementById('pagetitle').innerHTML="Edit the interview"                
            }
            );
}

function createInterviewForm(){
        clearAll();
        var form = document.createElement("form");
        form.setAttribute('id','form1');
        
        var startTime=createHtmlObject("input","datetime-local","start_time","start");
        var endTime=createHtmlObject("input","datetime-local","end_time","end");
        var dropdown1=createHtmlObject("select","","persons_list1","person1","width:100px");        
        var dropdown2=createHtmlObject("select","","persons_list2","person2","width:100px");

        var request=new XMLHttpRequest();
        let url=baseurl+'/list/persons'
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
        buttontextnode=document.createTextNode("Create Interview");
        submit.appendChild(buttontextnode);
        submit.setAttribute("value","Submit");
        submit.setAttribute("onclick","createInterview()");

        var br = document.createElement("br");         
        var h5=document.createElement("h5");

        starttext=h5.cloneNode();
        endtext=h5.cloneNode();
        person1text=h5.cloneNode();
        person2text=h5.cloneNode();
        
        starttext.innerHTML="Start Time";
        endtext.innerHTML="End Time";
        person1text.innerHTML="Participant 1";
        person2text.innerHTML="Participant 2";
        
            form.appendChild(starttext);
            form.appendChild(startTime);
            form.appendChild(br);

            form.appendChild(endtext);
            form.appendChild(endTime);   
            form.appendChild(br.cloneNode());
          
            form.appendChild(person1text);
            form.appendChild(dropdown1);
            form.appendChild(br.cloneNode());
            
            form.appendChild(person2text);
            form.appendChild(dropdown2);
            form.appendChild(br.cloneNode());
            form.appendChild(br.cloneNode()); 

            form.appendChild(submit);
        form.appendChild(br.cloneNode());
        document.getElementById('interviewbody').appendChild(form); 
        document.getElementById('pagetitle').innerHTML="Schedule the interview"

}

function getFormData(){
        formData=new FormData(document.getElementById("form1"));
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        return object

}

function createHtmlObject(element,type,id,name,style=" ",defaul=10,value=""){
        var element= document.createElement(element);
        element.setAttribute("type",type);
        element.setAttribute("style",style);
        element.setAttribute("default",defaul);
        element.setAttribute("id",id);
        element.setAttribute("name",name);
        element.setAttribute("value",value);
        return element;
}

function clearAll(){
        document.getElementById("viewTable").innerHTML=""
        document.getElementById("interviewbody").innerHTML=""
        document.getElementById('interview_id').innerHTML=""
        document.getElementById('pagetitle').innerHTML=""

}
function deleteInterview(interview_id){
        const url = baseurl+'/interview/delete/'+interview_id;
        fetch(url,{
                method:"POST",
        }).then(response=>res=response.json()).then(
                res=>{console.log(res.data)
                        alert(res.data.message);
                        getInterviews();
                }
        );

}

function editInterview(){
        const url = baseurl+'/interview/edit';
        object=getFormData();
        interview_id=document.getElementById('interview_id').value;
        object['interview_id']=interview_id;
        console.log(interview_id);
        var body = JSON.stringify(object);

         fetch(url, {
                method : "POST",
                contentType:'application/json',
                body: body,
                })
                .then(response => res=response.json())
                .then(
                        res => {console.log(res.data);
                        var msg=res.data.message;
                        alert(msg);
}
);
}

function createInterview(){
        const url = baseurl+'/interview/create';
        object=getFormData();
        var body = JSON.stringify(object);
        console.log(body);
        fetch(url, {
                    method : "POST",
                        contentType:'application/json',
                        body: body
                                })
                        .then(response => res=response.json())
                        .then(
                                res => {console.log(res.data);
                                        var msg=res.data.message;
                                        alert(msg);
                                }
                                );


}
