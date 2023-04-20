import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea'
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import {Create} from '../../Hooks/fetchData'
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { URL } from '../../Constant';
import './formDemo.css'

export const File = () => {


    const [visible, setVisible]= useState(false);
    const footerContent = (
        <div style={{textAlign:"center"}}>
            <Button label="אישור"  onClick={() => setVisible(false)} className="p-button-text" />
        </div>
    );
    //form
    const [formData, setFormData] = useState({}); 
    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            date:null,
            remarks: ''
        },
        validate: (data) => {

            let errors = {};

            if (!data.id) {
              errors.id = 'ת"ז הינו שדה חובה';
          }
          // else
          // if
          //הבדיקה של אתי

            if (!data.name) {
                errors.name = 'שם הינו שדה חובה';
            }

            if (!data.date) {
                errors.date = 'תאריך הינו שדה חובה';
            }
            else
            if(data.date>new Date()){
              errors.date = 'תאריך שגוי';
            }

            return errors;
        },
        
        onSubmit: async(data) => {

            const fileToCreate= {
                "IDnumberOfApplicant": data.id,
                "ApplicationSubmissionDate":data.date ,
                "name": data.name,
                "remarks": data.remarks,
                "statusId":1,
                "documents":selectedFiles
            }
            const res= await Create(`${URL}file`,fileToCreate);
            setFormData(res.body);
            console.log(res.body.ApplicationSubmissionDate);
            setVisible(true);
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    

    //upload
    const [selectedFiles, setSelectedFiles] = useState([]);

    const onTemplateRemove = (file, callback) => {
        callback();
        const newFiles= [...selectedFiles]
        setSelectedFiles(newFiles.filter((f)=>f.objectURL!= file.objectURL));
    };
  
    const onTemplateClear = () => {
        setSelectedFiles([]);
    };
  
    const itemTemplate = (file, props) => {
        return (         
            <div className="flex align-items-center flex-wrap"style={{ width: '60%' }}>
                <div className="flex align-items-center" style={{ width: '60%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={'15%'} />        
                    <span className="flex flex-column text-left ml-3" style= {{margin:'3%'}}>
                        {file.name}
                        {<br/>}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" style= {{margin:'3%', width:'120px'}}/>
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };
  
    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    גרור מסמכים לכאן
                </span>
            </div>
        );
    };
  
    const handleFileUpload = async (event) => {
      //Occurs when a document is dragged
  
      const curFiles=[...selectedFiles];
  
      Array.from(event.files).forEach(async(file) => {
        if (file.objectURL!= undefined)
        { 
          const reader = new FileReader();
          reader.onload = (event) => {
            curFiles.push( {document: event.target.result, 
              name:file.name.slice(0, file.name.lastIndexOf('.')), objectURL:file.objectURL})
          }
          reader.readAsDataURL(file);
        }
      });
        
      console.log("setSelectedFiles(curFiles);");
        setSelectedFiles(curFiles);
  
    }

      const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
      const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
      const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
    
    return (<>
        <Dialog visible={visible} style={{ width: '50%', textAlign:"center"}} onHide={() => setVisible(false)} footer={footerContent} >
            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
            <h3>😊 התיק נפתח בהצלחה</h3>
            <div className="flex align-items-center flex-column ">
            <p>
                מספר תיק : {formData.idfile!=null?formData.idfile:""} 
            <br/>
                ת"ז : {formData.IDnumberOfApplicant!=null?formData.IDnumberOfApplicant:""} 
            <br/>
                שם : {formData.name!=null?formData.name:""} 
            <br/>
                תאריך : {formData.ApplicationSubmissionDate!=null?new Date(formData.ApplicationSubmissionDate).toLocaleDateString():""} 
           <br/>
                הערות : {formData.remarks!=null?formData.remarks==''?"לא הוכנסו הערות":formData.remarks:"   "} 
            </p><p>התיק והמסמכים המצורפים נשלחים כעת לבדיקה ואימות, בעוד זמן קצר תוכלו לצפות בתוצאות. הבדיקה הינה חדשנית ואמינה ואחוזי ההצלחה שלה גבוהים. אולם עם זאת עלינו לציין שהיא מבוססת על בינה מלאכותית, וכמו רוב הטכנולוגיות הללו היא אינה באמינות של מאת האחוזים</p>
            </div>
        </Dialog>

    <div className="flex card-container blue-container overflow-hidden" style={{fontFamily:'fantasy'}}>
    <div className="flex-grow-0 form-demo flex justify-content-center">
        <div className="card">
            <form className="p-fluid">
                <h3 style={{textAlign: 'center'}}>פרטי התיק</h3>
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="id" name="id" value={formik.values.id} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('id') })} />
                        <label htmlFor="id" className={classNames({ 'p-error': isFormFieldValid('id') })} >תעודת זהות</label>
                    </span>
                    {getFormErrorMessage('id')}
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
                        <Calendar  dir={'ltr'} id="date" name="date" value={formik.values.date} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon className={classNames({ 'p-invalid': isFormFieldValid('date') })} />
                        <label htmlFor="date" className={classNames({ 'p-error': isFormFieldValid('date') })}>תאריך הגשת הבקשה</label>
                    </span>
                    {getFormErrorMessage('date')}
                </div>

                <div className="field">
                    <span className="p-float-label">
                        <InputTextarea id="remarks" name="remarks" value={formik.values.remarks} onChange={formik.handleChange} />
                        <label htmlFor="remarks">הערות</label>
                    </span>
                </div>
            </form> 
        </div>
    </div>

        <Divider layout="vertical" />

        <div className="flex-grow-1" width={'60%'}>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload onSelect={handleFileUpload} multiple accept="image/*"  
            itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions}
            uploadOptions={uploadOptions} cancelOptions={cancelOptions} onClear={onTemplateClear}/>
      </div>
    </div>

    <div className="card flex justify-content-center">
        {console.log(`render ${selectedFiles.length}`)}
      <Button type="submit" label="צור תיק" className="mt-2" /*disabled={selectedFiles.length==0} */
      onClick={formik.handleSubmit}/>
        {/* {selectedFiles.length==0 && <small>יש להעלות קבצים</small>} */}

    </div>
      </>);
}