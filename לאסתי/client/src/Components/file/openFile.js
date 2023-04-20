import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import FileDetail from './fileDetails';
import UploadDocuments from './uploadDocuments';
import {useLocation} from "react-router-dom"
import ViewResults from './viewResolts';




export default function OpenFileWithSteps() {
  const props= useLocation().state;
    const [activeIndex, setActiveIndex] = useState(props && props.file.result!=2?2:0);
    const [enabledIndex, setEnabledIndex] = useState(props?props.file.result!=2?2:1:0);
    const [details, setDetails] = useState(props? props.file: {});
    const [files, setFiles] = useState([]);
    const setIndex = (newIndx) =>{
        if (enabledIndex < newIndx)
            setEnabledIndex(newIndx);
        setActiveIndex(newIndx);
    }
    const handleDetailsNext = (details) => {
      setDetails(details);
      setIndex(1);
    };
  
    const handleDocumentsNext = (files) => {
      setFiles(files);
      setIndex(2);
    };
  
    const handleReset = () => {
      setActiveIndex(0);
      setEnabledIndex(0);
      setDetails({});
      setFiles([]);
    };
  
    const steps = [
      {
        label: 'פרטים',
        component: <FileDetail onNext={handleDetailsNext} details={details}/>
      },
      {
        label: 'מסמכים',
        disabled: enabledIndex < 1,
        component: <UploadDocuments onNext={handleDocumentsNext} details={details} onReset={handleReset}/>,
      },
      {
        label: 'תוצאות',
        disabled: enabledIndex < 2,
        component: <ViewResults details={details} files={files} /*onReset={handleReset}*/ />,
      },
    ];

    const renderStepContent = () => {
      const currentStep = steps[activeIndex];
      return currentStep.component;
    };
  
    const handleStepSelect = (index) => {
      setActiveIndex(index.index);
    };
  
    return (
        <>
            <Steps  model={steps} activeIndex={activeIndex}  onSelect={handleStepSelect} readOnly={false}/>
            <div style={{margin:'5% 15% 5% 15%'}}>
                {renderStepContent()}
            </div>
        </>
    );
}