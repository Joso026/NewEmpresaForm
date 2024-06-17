import React, { Suspense, lazy} from 'react';
import './App.css'

const FormComponent = lazy(() => import('./components/FormComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FormComponent />
      </Suspense>
    </div>
  )
}

export default App;
