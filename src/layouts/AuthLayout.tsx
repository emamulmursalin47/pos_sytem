import React from 'react';
import { Outlet } from 'react-router-dom';


const AuthLayout: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 "
    style={{
      backgroundImage: "url('https://res.cloudinary.com/dufs2ywc7/image/upload/v1746463856/point-of-sale-system_zdima2.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      
    }}>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl animate-fade-in">
        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <div className="p-3 mb-4 rounded-full bg-primary-100"
              style={{
                backgroundImage: "url('https://res.cloudinary.com/dufs2ywc7/image/upload/v1743935445/Arvion_Logo3_eofkaf.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '120px',
                height: '50px',
                
              }}>
             
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">POS System</h1>
          <p className="mt-2 text-gray-500">Streamline your retail operations</p>
        </div>
        
        <Outlet />
        
        <div className="mt-8 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Arvion Tech. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;