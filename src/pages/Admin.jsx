import { useNavigate } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import CategoriesSidebar from "../component/CategoriesSidebar";
import ListProducts from "../component/ListProducts";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-[90%] mx-auto">
      <div className="pt-5 flex justify-between">
        <h1 className="text text-2xl font-bold">Admin Cocoa</h1>
        <button onClick={handleLogOut}>
          <IoExit size={25} color="#c10007" />
        </button>
      </div>

      <div className="flex gap-10 py-8">
        <CategoriesSidebar />
        <span className="w-px bg-gray-300"></span>
        <ListProducts />
      </div>

      {/* <form>
        <h1>Create </h1>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" />
        <button>Create category</button>
      </form> */}
    </div>
  );
};

export default Admin;
