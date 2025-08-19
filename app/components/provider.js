"use client"

import React from "react";
import { createContext, useContext, useState } from 'react'
import { usePathname } from 'next/navigation'
import { destroyCookie } from "@/app/utils/auth";
export const UserContext = createContext(null)

export function useUserContext() {
    
    return useContext(UserContext)
}
  
export default function Provider({token, user, children}){
    if(token !== ""){
        if(user == ""){
          destroyCookie('user_token')
        }
      }
    return (
    <>
    <UserContext.Provider value={{user, token}}>
    {children}
    </UserContext.Provider>
    </>
    )
}