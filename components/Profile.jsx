import PromptCard from "./PromptCard"
import LoadingSpinner from "./LoadingSpinner"



const Profile = ({name, desc, data, handleEdit, handleDelete, loading}) => {
  return (
    <section className="w-full">
        <h1 className="head-text text-left blue_gradient">{name}'s profile</h1>
        <p className="desc text-left">{desc}</p>
        <div className="mt-10 prompt_layout">
        {loading && <LoadingSpinner />}
        {!data.length && !loading &&<h3 className="pt-3">No prompts to show</h3>}
            {data.map((post)=> (
                <PromptCard 
                    key={post._id}
                    post={post}
                    handleEdit={()=>handleEdit && handleEdit(post)}
                    handleDelete={()=>handleDelete && handleDelete(post)}
                />
            ))}
        </div>
    </section>
  )
}

export default Profile