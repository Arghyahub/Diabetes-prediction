import keras
import joblib
import pandas as pd


model = keras.models.load_model('./Diabetes_model.keras')
Scaler = joblib.load('StandardScaler.joblib')

def scaleData(X):
    return Scaler.transform(X)


def Predict(Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,BMI, DiabetesPedigreeFunction, Age):
    dummyDF = pd.DataFrame({'Pregnancies':[Pregnancies], 'Glucose':[Glucose], 'BloodPressure':[BloodPressure],
                         'SkinThickness':[SkinThickness], 'Insulin':[Insulin], 'BMI':[BMI], 
                            'DiabetesPedigreeFunction':[ DiabetesPedigreeFunction], 'Age':[Age]})
    
    pred_y = model.predict(scaleData(dummyDF))[0][0]
    diabetic = True if pred_y >= 0.5 else False
    dpercent = round(pred_y*100,2)
    return (f"Patient {'maybe' if diabetic else 'may not be'} diabetic , chances = {dpercent}%")