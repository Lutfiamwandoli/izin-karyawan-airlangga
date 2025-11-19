import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function Password(){
    const [data, setData] = useState([])
    const [password, setPassword] = useState([])


const getPassword = async (req,res)=>{
    const getPw = await api.get("api/izin/saya")
    setData(res.data)
    console.log(getPw);
    
}

useEffect(()=>{
    getPassword()
})


return(
    <>
    
    </>
)
}

