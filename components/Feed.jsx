'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import LoadingSpinner from "./LoadingSpinner"

const PromptCardList = ({data, handleTagClick})=>{
    return(
        <div className="mt-16 prompt_layout">
            {data.map((post)=> (
                <PromptCard 
                    key={post._id}
                    post={post}
                    handleTagClick={()=>handleTagClick(post.tag)}
                />
            ))}
        </div>
    )
}

const Feed = () => {

    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])
    const [searching, setSearching] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSearchChange = (e) => {

            setSearchText(e.target.value);
        };
  

    useEffect(()=>{
        const fetchPosts = async () => {
            setLoading(true)
            const res = await fetch("/api/prompt")
            const data = await res.json()
            setPosts(data)
            setLoading(false)
        }
        if(!searching)fetchPosts()
    }, [searching])

    useEffect(()=>{
        const fetchPosts = async () => {
                setLoading(true)
                const res = await fetch(`/api/prompt/search/${searchText}`)
                const data = await res.json()
                setPosts(data)
                setLoading(false)
        }
        const timeout = setTimeout(() => {
            if(searchText){
                if(!searching)setSearching(true)
                fetchPosts()
            }
            else setSearching(false)
        }, 500)
        return () => clearTimeout(timeout)
    }, [searchText])

    

  return (
    <section className="feed">
        <form className="relative w-full flex-center">
            <input
                type="text"
                placeholder="Search for tag or a username"
                value={searchText}
                onChange={handleSearchChange}
                required
                className="search_input peer"
            />
        </form>
        {loading && <LoadingSpinner />}
        {!posts.length && !loading &&<h3 className="pt-3">No prompts to show</h3>}
        <PromptCardList 
            data={posts}
            handleTagClick={setSearchText}
        />
    </section>
  )
}

export default Feed