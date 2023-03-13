import React from "react";

function File(props)
{
    return(
        <div>
            <label>{props.file.IDnumberOfApplicant}</label><br/>
            <label>{props.file.ApplicationSubmissionDate}</label><br/>
            <label>{props.file['status.name']}</label><br/>
        </div>
    )
}

export default File