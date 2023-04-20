
import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import axios from 'axios';
import { loadCache } from 'axios-hooks';
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';


export default function UploadDocuments() {

  const [selectedFiles, setSelectedFiles] = useState([]);

  //const [totalSize, setTotalSize] = useState(0);
  
  // const onTemplateSelect = (e) => {
  //     let _totalSize = totalSize;
  //     let files = e.files;

  //     Object.keys(files).forEach((key) => {
  //         _totalSize += files[key].size || 0;
  //     });

  //     setTotalSize(_totalSize);
  // };

  // const onTemplateUpload = (e) => {
  //     let _totalSize = 0;
  //     e.files.forEach((file) => {
  //         _totalSize += file.size || 0;
  //     });    
  //     setTotalSize(_totalSize);
  // };

  const onTemplateRemove = (file, callback) => {
      // setTotalSize(totalSize - file.size);
      callback();
      const newFiles= [...selectedFiles]
      setSelectedFiles(newFiles.filter((f)=>f.objectURL!= file.objectURL));
  };

  const onTemplateClear = () => {
      //setTotalSize(0);
      setSelectedFiles([]);
  };

  // const headerTemplate = (options) => {
  //     const { className, chooseButton, uploadButton, cancelButton } = options;
  //     // const value = totalSize / 10000;
  //     // const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

  //     return (
  //         <div dir="rtl" className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
  //             {chooseButton}
  //             {uploadButton}
  //             {cancelButton}
  //             {/* <div className="flex align-items-center gap-3 ml-auto">
  //                 <span>{formatedValue} / 1 MB</span>
  //                 <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
  //             </div> */}
  //         </div>
  //     );
  // };

  const itemTemplate = (file, props) => {
      return (
          
          <div className="flex align-items-center flex-wrap"style={{ width: '60%' }}>
              <div className="flex align-items-center" style={{ width: '60%' }}>
                  <img alt={file.name} role="presentation" src={file.objectURL} width={'30%'} />        
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
                  גרור מסמכים
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
          curFiles.push( {document: event.target.result, name:file.name, objectURL:file.objectURL})
        }
        reader.readAsDataURL(file);
      }
    });
      
      setSelectedFiles(curFiles);

  }

  const handleSendFile = async () => {
    //Occurs when the "Send File" button is pressed

    const obj= {"documents": selectedFiles};
    const res=  axios.post('http://localhost:4321/document',obj)
      .then((data) => {console.log(data);})
      .catch((error) => console.log(error));  
              
  };
    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
      <div>
        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

        <FileUpload  onSelect={handleFileUpload} multiple accept="image/*"  
          itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions}
          uploadOptions={uploadOptions} cancelOptions={cancelOptions}
          /*maxFileSize={1000000} onUpload={handleSendFile} /*onError={onTemplateClear}*/ onClear={onTemplateClear}
          /*headerTemplate={headerTemplate}*/ />
        <Button label="Send File" icon="pi pi-send" className="p-button-success" 
        disabled={!selectedFiles} onClick={handleSendFile}/>
        <button onClick={()=>{console.log(selectedFiles);}}>selected files</button>
      </div>
    )   
}
