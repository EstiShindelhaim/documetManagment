import React, {  useState } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Card } from "primereact/card";
import { Password } from 'primereact/password';
import { Dialog } from "primereact/dialog";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom"

import axios from 'axios';


export default function Login() {
    const [visible, setVisible] = useState(false);

const navigate = useNavigate();


  const handleLogin = async () => {
    console.log("handleLogin");
    try {
    //   const response = await refetch();
    const response= await axios.get(`http://localhost:4321/officer/${formik.values.userName}/${formik.values.password}`)  
    console.log(response.data);
    navigate("/openfile")

    } 
    catch (e) {
        setVisible(true)
     
    }
  };



    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validate: (data) => {
            let errors = {};

            if (!data.userName) {
              errors.userName = 'קוד משתמש נדרש';
            }
            if (!data.password) {
                errors.password = 'סיסמא נדרשת';
            }
            return errors;
        },
        onSubmit: (data) => {
            handleLogin();
            // formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
    const dialogFooter = <div className="flex justify-content-center"><Button label="אישור" className="p-button-text" autoFocus onClick={()=>setVisible(false)} /></div>;
    const header=<div  className="flex align-items-center flex-column pt-6 px-3"><h5>הפרטים שגויים</h5></div>

    return (
        <>
            <Dialog visible={visible} header={header} onHide={()=>setVisible(false)}  footer={dialogFooter} showHeader={true}  >
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <p>שם משתמש אינו קיים במערכת או שאינו תואם את הסיסמא שהוכנסה, אנא נסה שנית</p>
                </div>
            </Dialog>
        <div className="card flex justify-content-center">

            <Card style={{ width: "300px", margin: "5%" , textAlign:"center"}} title="כניסה למערכת " >
                <div className="card flex justify-content-center">
                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                        <span className="p-float-label">
                            <InputText
                                id="userName"
                                name="userName"
                                value={formik.values.buildingId}
                                onChange={(e) => {
                                    formik.setFieldValue('userName', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('userName') })}
                                style={{ width:"100%" }}
                            />
                            <label  htmlFor="userName">שם משתמש</label>
                        </span>
                        {getFormErrorMessage('userName')}

            

                        <span className="p-float-label">
                            <Password
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={(e) => formik.setFieldValue('password', e.target.value)}
                                toggleMask
                                className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                                feedback= {false}
                            />

                            <label htmlFor="input_value">סיסמא</label>
                        </span>
                        {getFormErrorMessage('password')}

                            <Button
                              //label={loading ? 'Loading' : 'Login'}
                              label="כניסה"
                              icon="pi pi-user"
                              className="w-10rem mx-auto"
                              type = 'submit'
                            // disabled={loading}
                            //   onClick={handleLogin}
                            />
                    </form>
                </div> 
            </Card>
           
        </div>
        </>
    )
}