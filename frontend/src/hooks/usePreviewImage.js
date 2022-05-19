import { useState } from 'react';

const usePreviewImage = () => {
  const [previewSource, setPreviewSource] = useState('');
  const [file, setFile] = useState(null);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader?.result);
    };
  };

  const handleChangeImageInput = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFile(e.target.files[0]);
    previewFile(e.target.files[0]);
    return file;
  };

  const reset = () => {
    setFile(null);
    setPreviewSource('');
  };

  return {
    previewFile,
    previewSource,
    file,
    setPreviewSource,
    handleChangeImageInput,
    reset,
  };
};

export default usePreviewImage;
