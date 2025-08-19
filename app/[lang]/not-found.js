"use client"
import Link from 'next/link'
import { usePathname, useRouter} from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Box } from '@mui/material'

export default function NotFound() {
 const pathName = usePathname()
 const lang = pathName.split("/")[1]
 const [count, setCount] = useState(3);
 const ref = useRef(null);
 const router = useRouter()
 useEffect(() => {
    ref.current = setInterval(() => setCount(counter => counter - 1), 1000);
    if(count <= 0){ 
        clearInterval(ref.current)
        router.push(`/${lang}/home`);
    }
    return () =>  {
        if (ref.current)
        {
            clearInterval(ref.current);
        }    
    }

  },[count]);
  return (
    <>
    <Box sx={{ height:"100vh", background:"#F2F2F2", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        
          <Box sx={{backgroundImage:"url(/images/notfound.png)", width:"623px", height:"540px", backgroundSize:"cover"}}> 

          </Box>
          <span style={{color:"black"}}><Link href={`/${lang}/home`}>{`Click here`}</Link> {`to return home or after ${count}s`} </span>
    </Box>
    </>
  )
}