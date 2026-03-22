import { useNavigate, Link } from "react-router-dom";
import Search from "./Search";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { IoExit } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogOut = () =>{
    localStorage.removeItem("token");
    navigate('/login', {replace : true});
  }

  return (
    <header>
      <div className="top-strip py-2 border-t border-b border-gray-300">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p>Cocoa</p>
            </div>
            <div className="col2 flex gap-6 items-center justify-end">
              <ul className="flex gap-3 items-center">
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className="link text-[12px] font-medium transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/order-tracking"
                    className="link text-[12px] font-medium transition"
                  >
                    Order Tracking
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="help-center"
                    className="link text-[12px] font-medium transition"
                  >
                    English
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="help-center"
                    className="link text-[12px] font-medium transition"
                  >
                    USD
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-3">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[25%]">
            <Link to={"/"}>
              <h1 className="text-3xl font-extrabold">Cocoa</h1>
            </Link>
          </div>
          <div className="col2 w-[50%]">
            <Search />
          </div>
          <div className="col3 w-[25%] items-center justify-end flex gap-6 text-red-">
            {token ? (
              <>
                <button>
                  <FaCartShopping size={20} />
                </button>
                <button>
                  <FaUser size={20} />
                </button>
                <button onClick={handleLogOut}>
                  <IoExit size={25} color="#c10007"/>
                </button>
              </>
            ) : (
              <>
                <button className="px-4 py-1 bg-black text-white rounded text-[16px]"><Link to="/login">Sign In</Link></button>
                <button className="px-4 py-1 border rounded text-[16px]"><Link to="/register">Sign U</Link>p</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
