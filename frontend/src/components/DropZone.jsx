// DropzoneWithPreview.js
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DropzoneWithPreview = () => {
  const [files, setFiles] = useState([]);
  const [error ,setError] = useState([]);
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
 
  // Function to handle the files dropped into the dropzone
  const onDrop = useCallback((acceptedFiles) => {
    const invalidFiles = acceptedFiles.filter(file => !allowedFileTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setError('Only JPEG, PNG, and GIF formats are allowed.');
      return; 
    }
    setError('');
 const previewFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prevFiles) => [...prevFiles, ...previewFiles]);
  }, []);
  
  // Clean up the file previews to avoid memory leaks
  React.useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
   
  // Set up the dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });
  
//   for delete the dropzone
  const handleDelete = (fileName, event) => {
 // it used for stop  the retrigered --  
    event.stopPropagation(); 
    setFiles(files.filter((file) => file.name !== fileName));
  };
  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #0087F7',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '5px',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag & drop some images here, or click to select files</p>
      )}

      {/* Display image previews */}
      <div style={{ display: 'flex', marginTop: '20px', flexWrap: 'wrap', gap: '10px' }}>
        {files.map((file) => (
          <div key={file.name} style={{ position: 'relative', border: '1px solid #ddd', padding: '5px' }}>
            <img
              src={file.preview}
              alt={file.name}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            {/* Delete button */}
            <button
              onClick={(event) => handleDelete(file.name, event)}
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropzoneWithPreview;
