import { useEffect, useRef } from "react"

const { default: Slogan } = require("components/Slogan")

const Loading=({loading})=>{
    const div=useRef()

    useEffect(()=>{
        if(!loading){
            div.current.className = "animate__animated animate__fadeOut";
        }
    },[loading])

    return (
        <div className="landing-footer" style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',backgroundImage:'url(https://images.unsplash.com/photo-1505547828843-176834e42154?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80)'}}>
            <div ref={div} style={{width:'40%'}}>
                <img src='/images/logow.png' className='animate__animated animate__pulse animate__infinite'/>
                <Slogan/>
            </div>
        </div>
    )
}

export default Loading