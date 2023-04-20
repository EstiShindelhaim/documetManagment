import React from "react";
import GetAllFiles from "../Hooks/files";
import AllFiles from "./file/allFiles";
import FileDetail from "./file/fileDetails";
import UploadDocuments from "./file/uploadDocuments";
import OpenFile from "./file/openFile";
import Login from "./login";
import File from "./file/file"

const Home= ()=>
{
    return (
        <>
        {/* hello home*/}
        {/* <AllFiles></AllFiles>  */}
        {/* <Login></Login> */}
        {/* <UploadDocuments></UploadDocuments> */}
        {/* <OpenFile></OpenFile> */}
        {/* <File></File> */}
        {/* <FileDetail></FileDetail> */}
        {/* <ValidInput invalidFunction={(x)=>x.length>5} name="שם משתמש" ></ValidInput> */}
        <a href= {`mailto:?cc=&bcc=&subject=${"subject"}&body=${"body"}`}>dtfeht</a>

        </>
    )
}

export default Home;