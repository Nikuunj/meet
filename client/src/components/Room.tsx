import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"


function Room() {
    const [serchParams, setSerchParams] = useSearchParams();
    const name = serchParams.get('name');
    useEffect(() => {
        // login to init user to the room 
    }, [name]);
    return (
        <div>Hi, {name}</div>
    )
}

export default Room