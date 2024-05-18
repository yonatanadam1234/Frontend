import React, { useEffect, useState } from 'react';
// import UploadClassic from '@crema/components/UploadClassic';
import Box from '@mui/material/Box';
import { useDropzone } from 'react-dropzone';
import UploadClassic from '../../../modules/thirdParty/reactDropzone/components/UploadClassic';
import AppList from '@crema/components/AppList';
import FileRow from '../../../modules/thirdParty/reactDropzone/components/FileRow';

const Expenses = () => {
  const dropzone = useDropzone({
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg', '.xlsx'],
    },
  });
  const { fileRejections, acceptedFiles } = dropzone;
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
  }, [acceptedFiles]);

  const onDeleteUploadFile = (file) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...acceptedFiles]);
  };

  return (
    <Box >
      <UploadClassic
        uploadText='Drag your documents, photos or videos here to start uploading.'
        dropzone={dropzone}
      />
      <aside>
        <h4>Accepted files</h4>
        <AppList 
          data={uploadedFiles}
          renderRow={(file, index) => (
            <FileRow
              key={index + file.path}
              file={file}
              onDeleteUploadFile={onDeleteUploadFile}
            />
          )}
        />
        <h4 style={{ marginTop: 10 }}>Rejected files</h4>
        <AppList
          data={fileRejections}
          renderRow={(file, index) => (
            <FileRow
              key={index + file.path}
              file={file}
              onDeleteUploadFile={() =>
                fileRejections.splice(fileRejections.indexOf(file), 1)
              }
            />
          )}
        />
      </aside>
    </Box>
  );
};
export default Expenses;

