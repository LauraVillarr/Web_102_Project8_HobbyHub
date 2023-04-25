import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Components/card'
import { supabase } from '../client';

const HomeFeed = () => {

    const [searchInput, setSearchInput] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const {data} = await supabase
          .from('Posts')
          .select()
          .order('created_at', { ascending: true })
    
          // set state
          setPosts(data)
        }
        fetchPosts();
      }, []);

      const filterPostsByNewest = async () => {
        const {data} = await supabase
          .from('Posts')
          .select()
          .order('created_at', { ascending: false });
    
          // set state
          setPosts(data);
      }

      const filterPostsByMostUpvotes = async () => {
        const {data} = await supabase
          .from('Posts')
          .select()
          .order('upvotes', { ascending: false });
    
          // set state
          setPosts(data);
      }

      const updateUpvotes = async (postData) => {
        // copy the posts so we can update it
        let newArr = [...posts];
        // find the index of the postData so we can update the specific post
        let index = posts.findIndex(checkPosts);
        if(index != -1) {
            // update postData's upvotes
            newArr[index]["upvotes"] = postData.upvotes + 1; 
            event.preventDefault();
    
            // send updated data to database
            await supabase
            .from('Posts')
            .update({upvotes: newArr[index]["upvotes"]})
            .eq('id', postData.id);
    
            // locally update the posts to the array
            setPosts(newArr);
        }

        function checkPosts(post) {
            return post.id == postData.id;
        }
       
      }

    // const postData = [
    //     {
    //       "id": 65,
    //       "created_at": "2023-04-10 04:45:54.471979+00",
    //       "title": "Which is better? American Revolution or French Revolution?",
    //       "content": "",
    //       "image_url": "",
    //       "upvotes": 3,
    //       "comments": ["America!!!"]
    //     },
    //     {
    //       "id": 73,
    //       "created_at": "2023-04-10 09:20:57.187388+00",
    //       "title": "I'm obsessed with the Holy Roman Empire",
    //       "content": "It's holy, Roman, and an empire",
    //       "image_url": "",
    //       "upvotes": 23,
    //       "comments": "[\"Very true\", \"Haha!]"
    //     },
    //     {
    //       "id": 87,
    //       "created_at": "2023-04-14 23:53:31.127016+00",
    //       "title": "Who is your favorite Founding Father?",
    //       "content": "Mine is Thomas Jefferson! What about you?",
    //       "image_url": "https://i.imgur.com/0QpthJU.jpg",
    //       "upvotes": 3,
    //       "comments": ["It's gotta be George Washington!", "Did you forget about Ben Franklin?"]
    //     },
    //     {
    //       "id": 59,
    //       "created_at": "2023-04-08 01:19:55.739826+00",
    //       "title": "I love history!",
    //       "content": "",
    //       "image_url": "https://i.imgur.com/wzk9rEB.jpg",
    //       "upvotes": 2,
    //       "comments": []
    //     }
    //   ]

    return (
        <div className='homefeed_container'>
            <div className='filters'>
                <div className='search_bar_container'>
                    <input
                    className='search_bar'
                    type="text"
                    placeholder="Search by title..."
                    onChange={event => setSearchInput(event.target.value)}
                    />
                </div>
                    <div className='btn_filter_container'>
                        <span>Order by: </span>
                        <button className='btn_filter' onClick={filterPostsByNewest}>Newest 🥚</button>
                        <button className='btn_filter' onClick={filterPostsByMostUpvotes}>Most Popular ✨</button>
                    </div>
                </div>
            {posts != null && posts.length > 0 ? (
                // filter out the data based on the search input
                posts.filter((val)=> {
                    if(searchInput == "") {
                      return val;
                    }
                    else if((val.title)
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())) {
                      return val;
                    }
                    // map the resulting entries from the search
                  }).map((post, index) =>
                <div key={index}>
                    <Card postData={post} updateUpvotes={updateUpvotes} />
                </div>
                )) : 
                <div>
                    <p className='post_title'>No Posts Created Yet!</p>
                    <Link to='/createPost'>
                    <button>Create one Here 🥚</button>
                    </Link> 
                </div>
            }
        </div>
    )
}

export default HomeFeed;