"use client"

import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const MyPage = () => {

    const router = useRouter()
    const {data : session} = useSession();

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        const fetchPosts = async () => {
            setLoading(true)
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()
            setPosts(data)
            setLoading(false)
        }
        if(session?.user.id)fetchPosts()
    }, [session?.user.id])

    const handleEdit = (post) => {
        console.log(post._id)
        router.push(`/update-prompt?id=${post._id}`);
      };

    const handleDelete = async (post) => {
        const hasConfirmed= confirm("Are you sure you want to delete?")
        if(hasConfirmed){
            try {
                await fetch(`api/prompt/${post._id.toString()}`, {method: 'DELETE'})
                const filteredPosts= posts.filter((p)=> {
                    p._id !== post._id
                })
                setPosts(filteredPosts)
            } catch (error) {
                
            }
        }
    }


  return (
    <Profile 
        name={session?.user.name}
        desc= "Welcome to your profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading = {loading}
    />
  )
}

export default MyPage