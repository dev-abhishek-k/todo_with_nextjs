"use client"
import {createTodo} from "@/lib/todos"
import { useState } from "react"   
import { useRouter } from "next/navigation" 
import {Button} from "@/components/ui/button"


export function AddTodo(){
    const router= useRouter();
const [title, setTitle] = useState("");
const [isSubmit, setIsSubmit] = useState(false); 

async function handleSubmit(
    event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const trimmed=title.trim()
    if(!trimmed || isSubmit) return
    setIsSubmit(true);
     try {
        const todo=await createTodo(trimmed);       
        if(todo){
            setTitle("");
            router.refresh();
        }
     }finally{
        setIsSubmit(false); 
     }
}
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Add a new todo" onChange={(e)=>setTitle(e.target.value)}value={title} />
            <Button type="submit" disabled={isSubmit}>Add</Button>
        </form>
    )       
}