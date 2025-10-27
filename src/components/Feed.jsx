import { useSelector } from "react-redux";
import Card from "./Card";

const Feed = ()=>{
    const user = useSelector((store)=>store.user)
    return(
        <div className="flex items-center justify-center">
            <Card user={user}/>
        </div>
    )
}

export default Feed;