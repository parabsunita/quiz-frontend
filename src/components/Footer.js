function Footer(){
    return (
      <footer className="flex justify-between items-center py-2 px-4 pb-4 bg-gray-100 text-gray-800 text-sm fixed bottom-0 w-full shadow-md">
        <div className="text-left flex-1">
          © QuizMaze. All rights reserved.
        </div>
        <div className="text-right flex-1">
          <a href="/support" className="text-secondary-grey hover:text-gray-600">Contact support</a> 
          <span className="mx-2">|</span> 
          <a href="/report" className="text-secondary-grey hover:text-gray-600">Report a problem</a>
        </div>
      </footer>
    );
  };
  
  export default Footer;