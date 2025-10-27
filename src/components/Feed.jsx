import { useSelector } from "react-redux";
import Card from "./Card";

const Feed = ()=>{
    const user = useSelector((store)=>store.user)

    if(!user){
        return(<div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-amber-500"></span>
      </div>
        )
    }
    return(
        <div className="flex items-center justify-center">
            <Card user={user}/>
        </div>
    )
}

export default Feed;