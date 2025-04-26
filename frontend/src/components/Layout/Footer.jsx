const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">StoreRatings</h3>
              <p className="text-gray-400 mt-1">Rate your favorite stores</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-300 transition">Terms</a>
              <a href="#" className="hover:text-blue-300 transition">Privacy</a>
              <a href="#" className="hover:text-blue-300 transition">Contact</a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} StoreRatings. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;