import { RouterProvider } from 'react-router'
import router from './router'




function App() {

  return (
    <>
      <h1>hello</h1>
      <RouterProvider router={router} />
    </>
  )
}

export default App
