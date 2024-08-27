"use client"
import { getData } from '@/lib/getData'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function page() {
    const [books, setBooks] = useState([])
    const fetchData = async () => {
        const res = await getData("books")
        setBooks(res)
    }
    useEffect(() => {
        fetchData()
    },[])
    console.log(books);
    
  return (
    <div>page</div>
  )
}
