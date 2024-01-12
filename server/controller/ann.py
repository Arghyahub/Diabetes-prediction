import joblib
import pandas as pd
import numpy as np
import tflite_runtime.interpreter as tflite

Scaler = joblib.load('StandardScaler.joblib')

def scaleData(X):
    return Scaler.transform(X)

class LiteModel:
    def __init__(self, model_path):
        self.interpreter = tflite.Interpreter(model_path=model_path)
        self.interpreter.allocate_tensors()
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

    def predict(self, Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,BMI, DiabetesPedigreeFunction, Age):
        dummyDF = pd.DataFrame({'Pregnancies':[Pregnancies], 'Glucose':[Glucose], 'BloodPressure':[BloodPressure],
                         'SkinThickness':[SkinThickness], 'Insulin':[Insulin], 'BMI':[BMI], 
                            'DiabetesPedigreeFunction':[ DiabetesPedigreeFunction], 'Age':[Age]})
        
        input_data = scaleData(dummyDF)
        input_data = np.array(input_data,dtype=np.float32)

        # Set tensor values for the input
        self.interpreter.set_tensor(self.input_details[0]['index'], input_data)

        # Run inference
        self.interpreter.invoke()

        # Get output data
        output_data = self.interpreter.get_tensor(self.output_details[0]['index'])

        pred_y =  output_data[0][0]
        diabetic = True if pred_y >= 0.5 else False
        dpercent = round(pred_y*100,2)
        return (f"Patient {'maybe' if diabetic else 'may not be'} diabetic , chances = {dpercent}%")

# Example usage
    
# liteFile = open('./liteModel.tflite','rb')

# print(liteFile.read())

model = LiteModel(model_path='liteModel.tflite')

# Make prediction
# prediction = model.predict(2,140,80,40,0,33,0.6,42)

# print(f"Prediction: {prediction}")


# def Predict(Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,BMI, DiabetesPedigreeFunction, Age):
#     dummyDF = pd.DataFrame({'Pregnancies':[Pregnancies], 'Glucose':[Glucose], 'BloodPressure':[BloodPressure],
#                          'SkinThickness':[SkinThickness], 'Insulin':[Insulin], 'BMI':[BMI], 
#                             'DiabetesPedigreeFunction':[ DiabetesPedigreeFunction], 'Age':[Age]})
    
#     pred_y = model.predict(scaleData(dummyDF))[0][0]
#     diabetic = True if pred_y >= 0.5 else False
#     dpercent = round(pred_y*100,2)
#     return (f"Patient {'maybe' if diabetic else 'may not be'} diabetic , chances = {dpercent}%")