import { useState } from "react";
import Form from "./components/Form";
import SuccessModal from "./components/SuccessModal";

function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <>
      {isSuccess ? <SuccessModal onReturn={setIsSuccess}/> : <Form onSucces={setIsSuccess}/>}
    </>
  ) 
}

export default App;
