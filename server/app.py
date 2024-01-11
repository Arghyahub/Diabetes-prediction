from flask import Flask , request , jsonify

from controller.ann import Predict

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/predict',methods=['POST'])
def predict():
    data = request.json
    required_params = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']
    for param in required_params:
        if param not in data:
            return jsonify({'msg': f'Missing parameter: {param}'}), 400
        
    Pregnancies = float(data['Pregnancies']) 
    Glucose = float(data['Glucose']) 
    BloodPressure = float(data['BloodPressure']) 
    SkinThickness = float(data['SkinThickness']) 
    Insulin = float(data['Insulin'])
    BMI = float(data['BMI']) 
    DiabetesPedigreeFunction = float(data['DiabetesPedigreeFunction']) 
    Age = float(data['Age'])

    st = Predict(Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age)

    return jsonify({'msg': st})
    


if __name__ == '__main__':
    app.run(debug=True)
