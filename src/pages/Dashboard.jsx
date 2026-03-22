import Header from "../component/Header";
import CategoriesSidebar from "../component/CategoriesSidebar";
import ListProducts from "../component/ListProducts";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex gap-10 py-8 w-[90%] mx-auto">
        <CategoriesSidebar />
        <span className="w-px bg-gray-300"></span>
        <ListProducts />
      </div>

      <footer className="w-full mt-auto">
        <div className="text-center py-3 border-t border-gray-300">
          <p>&copy; 2026 Cocoa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
