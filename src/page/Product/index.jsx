import React,  {useState , useEffect } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/CardProduct/";
import SanphamApi from '../../../api/sanphamApi'
import Category from "../../../api/categoryApi"
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
function Index() {
  const [sofaList, setSofaList] = useState([]);
  const [navlink , setNavLink] = useState("All")
  const [menuList, SetmenuList] = useState([]);
  const handleSetActive = (value) =>{
    setNavLink(value);
  }
  useEffect(() => {
    fetchData2();
    fetchData();
  }, [navlink]); 

  const fetchData = async () => {
    try {
      const params = {
        limit: 6,
        category: navlink,
      };
      const response = await axios.get("http://localhost:3000/sanpham", { params });
      setSofaList(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const  fetchData2 = async () =>{
    try {
      axios
        .get("http://localhost:3000/category")
        .then((response) => {
          SetmenuList(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
    const [orderPopup, setOrderPopup] = React.useState(false);

    const handleOrderPopup = () => {
      setOrderPopup(!orderPopup);
    };
    React.useEffect(() => {
      AOS.init({
        offset: 100,
        duration: 800,
        easing: "ease-in-sine",
        delay: 100,
      });
      AOS.refresh();
    }, []);
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar handleOrderPopup={handleOrderPopup} />
      <div className="">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 bg-white p-4 rounded">
              <h2 className="text-xl font-bold mb-4">Danh Mục Sản Phẩm</h2>
              <div className="flex flex-col">
              <span onClick={() => handleSetActive("All")} className="font-bold cursor-pointer hover:opacity-50">All</span>

              { menuList && menuList.map((category) => (
                  <span onClick={() => handleSetActive(category.name)}  key={category._id} className="font-bold cursor-pointer hover:opacity-50">{category.name}</span>
                ))}
                
              </div>
            </div>
            <div className="col-span-3 bg-white p-4 rounded">
              <h2 className="text-xl font-bold mb-4">Product Display</h2>
              <div className="relative w-[200px] mb-5">
                <input
                  className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search..."
                />
                <div className="absolute right-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>

                <div className="absolute left-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {sofaList.map((sofa) => (
                  <Card key={sofa._id} item={sofa} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index