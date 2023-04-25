import { useState } from "react";
import { supabase } from "../client";

const CreatePost = () => {
    const [post, setPost] = useState({title: "", content: "", image_url: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log("Name: ", name, " value: ", value);
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        
        event.preventDefault(); 

        if(post.title != "") {
            await supabase
            .from('Posts')
            .insert({title: post.title, content: post.content, image_url: post.image_url})
            .select();

            window.location = "/";  
        } 
        else {
            alert("A title is required in order to make a post");
        }
    }

    return (
        <div className="create_card">
            <form className="create_form">
                <h3 className="form_title">Create a New Post</h3>
                    <div className="form_item">
                    <label for='title'>Post Title</label> <span className="form_tag">(Required)</span> <br />
                    <input className="textbox" type="text" id="title" name="title" value={post.title} onChange={handleChange} required />
                    </div>
                    <div className="form_item">
                        <label for='content'>Post Content</label><br />
                        <textarea className="post_content_input" rows="5" cols="50" id="content" name="content" value={post.content} onChange={handleChange}/>
                    </div>
                    <div className="form_item">
                        <label for='image_url'>Image URL</label> <br />
                        <input className="textbox" type="text" id="image_url" name="image_url" value={post.image_url} onChange={handleChange}/>
                    </div>
            </form>
            <button type="submit" onClick={createPost} className="create_edit_post_btn">Create</button>

        </div>
    );
  };
  
  export default CreatePost;