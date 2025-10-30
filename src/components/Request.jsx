import { useSelector } from "react-redux"
import ConnectionCard from "./ConnectionCard";

const Request = ()=>{
    const request = useSelector((store)=> store.request);


    if(!request) return (<div>Looking for request</div>)
    
    if(request.length == 0) return (<div>no requests yet</div>)

        
    return(
        <div>
            {request.map((request)=>(
                <ConnectionCard data={request.fromUserId}/>
            ))}
        </div>
    )
}

export default Request