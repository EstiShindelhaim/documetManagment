import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea'
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { Update } from '../../Hooks/fetchData';
import './formDemo.css'
import SubmmitedDialog from '../submmitedDialog';

export default function FileDetail(props){

    const validId=(value)=>
    {
        if(value.length!= 9)
            return false;
        let sum=0;
        let ss=0;
        let a=value.split("");
        let i=0;
        for(i=0;i<a.length-1;i+=2)
        {
            sum+=parseInt(a[i]);
        }
        for(i=1;i<a.length-1;i+=2)
        {
            ss=2*parseInt(a[i]);
            if(ss>9)
            {
                ss=parseInt(ss/10)+ss%10;
            }
            sum+=ss;
        }
        if(parseInt(a[a.length-1])!=(10-sum%10))
            return false;
        return true;
    }

    const [details, setDetails] = useState(props.details);
    const [visible, setVisible] = useState(false)
    if(details.ApplicationSubmissionDate!= undefined)
        details.ApplicationSubmissionDate= new Date(details.ApplicationSubmissionDate)

    const formik = useFormik({
        initialValues: {    
                  
            IDnumberOfApplicant: details.IDnumberOfApplicant?details.IDnumberOfApplicant:'',
            name: details.name?details.name:'',
            ApplicationSubmissionDate: details.ApplicationSubmissionDate?details.ApplicationSubmissionDate:null,
            remarks: details.remarks?details.remarks:'',
        },
        validateOnMount:true,
        validate: (data) => {

            let errors = {};

                if (!data.IDnumberOfApplicant) {
                errors.IDnumberOfApplicant = 'ת"ז הינו שדה חובה';
            }
            else
            if(!validId(data.IDnumberOfApplicant)){
                errors.IDnumberOfApplicant = 'ת"ז אינה חוקית';
            }
            if (!data.name) {
                errors.name = 'שם הינו שדה חובה';
            }

            if (!data.ApplicationSubmissionDate) {
                errors.ApplicationSubmissionDate = 'תאריך הינו שדה חובה';
            }
            else
            if(data.ApplicationSubmissionDate>new Date()){
                errors.ApplicationSubmissionDate = 'תאריך שגוי';
            }

            return errors;
        },
        
        onSubmit: async(data) => {}
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
 
    const handleNextClick = () => {
        props.onNext(formik.values);
    };


   return(<>

    <div className=" card-container blue-container overflow-hidden" >
    <div className="flex-grow-3 form-demo flex justify-content-center">
        <div className="card">
            <form className="p-fluid">
                <h3 style={{textAlign: 'center'}}>פרטי התיק</h3>
                {details.idfile &&
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="idFile" name="idFile" value={details.idfile} 
                        disabled={true} style= {{opacity:1}}/>
                        <label style= {{opacity:1}} htmlFor="idFile">מספר תיק</label>
                    </span>
                </div>}

                <div className="field">
                    <span className="p-float-label">
                        <InputText id="id" name="IDnumberOfApplicant"  value={formik.values.IDnumberOfApplicant} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('IDnumberOfApplicant') })} />
                        <label htmlFor="id" className={classNames({ 'p-error': isFormFieldValid('IDnumberOfApplicant') })} >תעודת זהות</label>
                    </span>
                    {getFormErrorMessage('IDnumberOfApplicant')}
                </div>

                <div className="field">
                    <span className="p-float-label">
                        <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>שם מגיש הבקשה</label>
                    </span>
                    {getFormErrorMessage('name')}
                </div>

                <div className="field">
                    <span className="p-float-label">
                        <Calendar  dir={'ltr'} id="date" name="ApplicationSubmissionDate" value={formik.values.ApplicationSubmissionDate} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999"
                         showIcon className={classNames({ 'p-invalid': isFormFieldValid('ApplicationSubmissionDate') })} />
                        <label htmlFor="date" className={classNames({ 'p-error': isFormFieldValid('ApplicationSubmissionDate') })}>תאריך הגשת הבקשה</label>
                    </span>
                    {getFormErrorMessage('ApplicationSubmissionDate')}
                </div>

                {details['status.name'] &&
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="status" name="status" value={details['status.name']} 
                        disabled={true} style= {{opacity:1}}/>
                        <label style= {{opacity:1}} htmlFor="status">סטאטוס</label>
                    </span>
                </div>}


                <div className="field">
                    <span className="p-float-label">
                        <InputTextarea id="remarks" name="remarks" value={formik.values.remarks} onChange={formik.handleChange} />
                        <label htmlFor="remarks">הערות</label>
                    </span>
                </div>
            </form> 
            </div>
        </div>     
    </div>        

    <div className="card flex justify-content-center">
        {visible && <SubmmitedDialog header= "נשמר בהצלחה" content="פרטי התיק עודכנו בהצלחה" onConfirm={()=>{setVisible(false)}}></SubmmitedDialog>}
      <Button type="submit" label={details.idfile?"לשמירה":"לשלב הבא"} className="mt-2"
      onClick={async()=>{
        formik.handleSubmit(); 
        if(formik.isValid) 
            if(details.idfile)
            {
                const res = await Update(`file/${details.idfile}`,formik.values)
                // const values = details;
                // details['IDnumberOfApplicant'] = formik.values['IDnumberOfApplicant']
                // details['name'] = formik.values['name']
                // details['ApplicationSubmissionDate'] = formik.values['ApplicationSubmissionDate']
                // details['remarks'] = formik.values['remarks']
                // formik.setValues(values);
                // console.log(formik.initialValues);
                // setDetails(values);
                ///////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////
                setVisible(true)
            }
            else
            handleNextClick();
        }
    }/>

    </div>
</>

      );
}