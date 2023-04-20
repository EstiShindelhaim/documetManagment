const base64toFile = require('node-base64-to-file');
const {unlink}= require('node:fs/promises');
const isBase64 = require('is-base64');

exports.uploadDocument=async(base64String, name, type, fileId)=>
{
  
  const document=`data:${type};base64,`.concat(base64String);


    await base64toFile(base64String, 
      {
        filePath: `${process.env.PATH_FILE}${fileId}//`,
        fileName: name,
        types: [type],
        fileMaxSize: 3145728
      }
    );

};

exports.deleteDocument=async(document)=>
{
  
    try 
    {
      await unlink(process.env.PATH_FILE+document.fileId+"//"+document.name);
      console.log('successfully deleted /tmp/hello');
    } 
    
    catch (error) 
    {
      console.error('there was an error:', error.message);
    }
}