"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Profile from '@components/Profile'

const ProfilePage = ({params}) => {
    const router = useRouter()
    const userId = params.userId
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const fetchPosts = async () => {
            setLoading(true)
            const res = await fetch(`/api/users/${userId}/posts`)
            const data = await res.json()
            setPosts(data)
            setLoading(false)
        }
        if(userId)fetchPosts()
    }, [userId])

  return (
    <Profile 
    name="name"
    desc= "Welcome to users profile"
    data={posts}
/>
  )
}

export default ProfilePage