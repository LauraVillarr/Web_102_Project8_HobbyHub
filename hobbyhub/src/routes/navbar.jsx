import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <div className='navigation'>
                <Link to="/">
                    <h2 className='nav_element'>CooksCafe 🍵</h2>
                </Link>
                <Link to='/createPost'>
                    <h4 className='nav_element'>🍳Create a Post!</h4>
                </Link>
            </div>
          <Outlet />
        </div>
      );
};

export default NavBar;