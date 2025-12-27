import {useParams} from "react-router-dom";

const Chat = ()=>{

    const { targetUserId } = useParams()

    return (
        <div>
            Chat
        </div>
    )
}

export default Chat