import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { GetOfficer, ChangeDetails } from '../Hooks/setting.js';
import './file/formDemo.css';
import EmailLink from './EmailLink.js';

export default function Setting() {
    const [txtvi,setTxtvi]=useState(false);
    const [value, setValue] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [txt,setTxt]=useState('');
    const[aPass,setAPass]=useState(false)
    const check=async()=>
    {
        setTxtvi(true);
        setShowMessage(false)
        const {data, loading, error , refetch}=await GetOfficer();
        if(loading)
        {

        }
        else 
        {
            console.log(data.password);
            if(data.password.localeCompare(value)==0)
            {
                if(formData.email=='')
                    formData.email=data.mail;
                if(formData.name=='')
                    formData.name=data.name;
                if(formData.password=='')
                    formData.password=data.password;
                console.log("aaa");
                console.log(formData);
                ChangeDetails(formData);
                console.log("vvv");
                setTxt("הפרטים שונו");
            }
            else
                setTxt("הסיסמא שגויה נסה שנית")
        }


    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            aPass:''
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'כתובת המייל לא תקינה';
            }

            if(data.password!=''&& data.aPass!='')
                if(data.password.localeCompare(data.aPass)!=0)
                    errors.aPass='הסיסמאות לא תואמות אנא נסה שנית'



            return errors;
        },
        onSubmit: (data) => {
            console.log("aaa");
            setFormData(data);
            setShowMessage(true);
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="אישור" className="p-button-text" autoFocus onClick={() => check(value)} /></div>;
    const dialogFooter1 = <div className="flex justify-content-center"><Button label="אישור" className="p-button-text" autoFocus onClick={() => setTxtvi(false)} /></div>;
    const passwordHeader = <h6>הכנס סיסמא</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">הצעות</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>לפחות אות אחת קטנה</li>
                <li>לפחות אות אחת גדולה</li>
                <li>לפחות מספר אחד</li>
                <li>לפחות שמונה תווים</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo" style={{fontFamily:"Guttman Yad"}}>
            <Dialog visible={showMessage}  footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <h5>הכנס סיסמא ישנה</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        <div className="card flex justify-content-center">
                            <Password value={value} onChange={(e) => setValue(e.target.value)} feedback={false} toggleMask />
                            
                        </div>
                    </p>
                </div>
            </Dialog>
            <Dialog visible={txtvi}  footer={dialogFooter1} showHeader={false}  style={{ width: '30vw' }}>
                                <div style={{textAlign:"center"}}>
                                    {txt}
                                </div>
            </Dialog>
            <div className="flex justify-content-center">
                <div className="card">
                    <h2 className="text-center">שינוי פרטים אישיים</h2>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>שם</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText  id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>מייל</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onBlur={()=>{formik.values.password!=''? setAPass(true):setAPass(false)}} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>סיסמא</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        
                        
                        {aPass==false?<><div >
                        </div></>:<><div className="field">
                            <span className="p-float-label">
                                <Password id="aPass" name="aPass" value={formik.values.aPass} feedback={false} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('aPass') })}  />
                                <label htmlFor="aPass" className={classNames({ 'p-error': isFormFieldValid('aPass') })}>הכנס סיסמא שנית</label>
                            </span>
                            {getFormErrorMessage('aPass')}
                        </div></>}



                        <Button type="submit" label="אישור" className="mt-2" />
                    </form>
                </div>
            </div>
            <EmailLink></EmailLink>
        </div>
    );
}
