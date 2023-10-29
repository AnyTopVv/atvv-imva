import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '@/components/Loading';
import BaseLayout from '@/pages/BaseLayout';
// const BaseLayout = lazy(() => import('@/pages/BaseLayout'));

function App() {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="*"
          element={
            <BaseLayout />
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
