import {getFormData} from "./utlis";

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


export {createInterview,editInterview}