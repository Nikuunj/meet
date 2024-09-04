import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css'
import Landing from './components/Landing';
import Error from './components/Error';
import Room from './components/Room';

function App() {

  const Layout = () => (
    <div className='bg-zinc-800 text-slate-200 overflow-hidden'>
          <Outlet />
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",  
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Landing />
        },
        {
          path: "/room",
          element: <Room />
        },
      ],
    },
  ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
