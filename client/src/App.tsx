import { useState } from "react";
import SimpleNavbar from "./components/navbar/SimpleNavbar";
import { PropagateLoader } from "react-spinners";

const backend = import.meta.env.VITE_BACKEND  ;

interface formInput {
  target:{
    Pregnancies: HTMLInputElement; 
    Glucose: HTMLInputElement; 
    BloodPressure: HTMLInputElement; 
    SkinThickness: HTMLInputElement; 
    Insulin: HTMLInputElement;
    BMI: HTMLInputElement; 
    DiabetesPedigreeFunction: HTMLInputElement; 
    Age: HTMLInputElement;
  }
}

const Home = () => {
  const [Msg, setMsg] = useState('') ;
  const [Loading, setLoading] = useState(false) ;

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement> & formInput) => {
    e.preventDefault();
    setLoading(true) ;
    const Pregnancies = Number(e.target.Pregnancies.value);
    const Glucose = Number(e.target.Glucose.value);
    const BloodPressure = Number(e.target.BloodPressure.value);
    const SkinThickness = Number(e.target.SkinThickness.value);
    const Insulin = Number(e.target.Insulin.value);
    const BMI = Number(e.target.BMI.value);
    const DiabetesPedigreeFunction = Number(e.target.DiabetesPedigreeFunction.value);
    const Age = Number(e.target.Age.value);

    if (!Pregnancies || !Glucose || !BloodPressure || !SkinThickness || !Insulin || !BMI || !DiabetesPedigreeFunction || !Age ){
      alert("All Data must be filled and in decimal format");
      setLoading(false) ;
      return
    }

    const payload = {
      Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,BMI, DiabetesPedigreeFunction, Age
    }

    try {
      const resp = await fetch(`${backend}/predict`,{
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const res = await resp.json() ;
      setMsg(res.msg)
    } catch (error) {
      console.log('error');
      alert('Server Error')
    }
    finally{
      setLoading(false) ;
    }
  }
  return (
    <div className="flex flex-col w-full h-screen">
      <SimpleNavbar />
      <div className="flex flex-col items-center justify-center w-full h-full bg-[var(--background)]">
        <h1 className="text-center text-wrap text-white font-mono mx-2 text-[1.2rem] md:text-xl lg:text-3xl relative -top-2 md:mb-5">Diabetes predicting using Artificial Neural Network</h1>
        <h4 className="text-wrap text-center text-yellow-300 relative -top-2">{Msg}.</h4>
        <form onSubmit={handleSubmit} className="w-[90vw] max-w-lg">
          <div className="flex flex-row gap-2 p-2 w-full">
            <label htmlFor="Pregnancies" className="text-white text-nowrap">Pregnancies :</label>
            <input type="text" name="Pregnancies" placeholder="Number of pregnancies" className="w-5/6 flex flex-row ml-auto p-1 px-2 rounded-md" />
          </div>
          <div className="flex flex-row gap-2 p-2 w-full">
            <label htmlFor="Glucose" className="text-white text-nowrap">Glucose:</label>
            <input type="text" name="Glucose" placeholder="Blood glucose level" className="w-5/6 flex flex-row ml-auto p-1 px-2 rounded-md" />
          </div>
          <div className="flex flex-row gap-2 p-2 w-full">
            <label htmlFor="BloodPressure" className="text-white text-nowrap">BloodPressure:</label>
            <input type="text" name="BloodPressure" placeholder="Lower blood pressure in (mm Hg)" className="w-5/6 flex flex-row ml-auto p-1 px-2 rounded-md" />
          </div>
          <div className="flex flex-row gap-2 p-2 w-full">
            <label htmlFor="SkinThickness" className="text-white text-nowrap">Skin Thickness:</label>
            <input type="text" name="SkinThickness" placeholder="Skin thickness in (mm)" className="w-5/6 flex flex-row ml-auto p-1 px-2 rounded-md" />
          </div>
          <div className="flex flex-row gap-2 p-2 w-full">
            <label htmlFor="Insulin" className="text-white text-nowrap">Insulin:</label>
            <input type="text" name="Insulin" placeholder="2-Hour serum insulin (mu U/ml)" className="w-5/6 flex flex-row ml-auto p-1 px-2 rounded-md" />
          </div>
          <div className="flex flex-row gap-2 p-2 w-full">
            <label htmlFor="BMI" className="text-white text-nowrap">BMI:</label>
            <input type="text" name="BMI" placeholder="Your BMI" className="w-5/6 flex flex-row ml-auto p-1 px-2 rounded-md" />
          </div>
          <div className="flex flex-row gap-2 p-2 w-full">
            <label htmlFor="DiabetesPedigreeFunction" className="text-white text-nowrap">DiabetesPedigreeFunction:</label>
            <input type="text" name="DiabetesPedigreeFunction" placeholder="Family history avg(0.47)" className="w-5/6 flex flex-row ml-auto p-1 px-2 rounded-md" />
          </div>
          <div className="flex flex-row gap-2 p-2 w-full">
            <label htmlFor="Age" className="text-white text-nowrap">Age:</label>
            <input type="text" name="Age" placeholder="Your age" className="w-5/6 flex flex-row ml-auto p-1 px-2 rounded-md" />
          </div>

          <div className="flex flex-row w-full justify-center mt-4">
            <button type="submit" className="bg-blue-400 text-white hover:bg-green-400 hover:shadow-sm px-3 py-1 rounded-md">Submit</button>
          </div>
        </form>
      </div>

      {Loading && (
        <div className='absolute h-screen w-screen bg-black bg-opacity-70 z-10 top-0 flex flex-row justify-center items-center'>
          <div className="flex flex-col items-center justify-center">
            <PropagateLoader 
              color="#36d7b7"
              size={35}
              cssOverride={{ width: '200px' , height: '100px' , justifyContent: 'center', alignItems: 'center' }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default Home