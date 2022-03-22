import CameraAltIcon from '@mui/icons-material/CameraAlt';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { List, ListItem } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Control, Controller } from 'react-hook-form';
import { CreateProduct } from '../../../../models/products';

interface Props {
  control: Control<CreateProduct, any>;
  name: 'imagesOrder';
  dataDetail?: CreateProduct;
  handleRemoveImg?: (id: number) => void;
}

const DropInput = (props: Props) => {
  const { control, name, dataDetail, handleRemoveImg } = props;
  const [images, setImages] = useState<any[]>([]);
  const [imgId, setImgId] = useState<number[]>([]);
  const [valueImg, setValueImg] = useState<any[]>([]);

  const handleDropImg = (value: File[]) => {
    if (value) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImages((curr) => [...curr, reader.result]);
      });
      reader.readAsDataURL(value[0]);
    }
  };

  const handleRemoveImgUpload = (value: string[], index: number) => {
    setImages((prev) => prev.filter((item, key) => key !== index));
    const newData = value.filter((item, key) => key !== index);
    if (dataDetail && handleRemoveImg && imgId[index]) {
      handleRemoveImg(imgId[index]);
      setImgId((prev) => prev.filter((item) => item !== imgId[index]));
    }
    return newData;
  };

  const handleUpload = (file: File[]) => {
    const result = [...valueImg, file];
    setValueImg((prev) => [...prev, file]);
    console.log(result);
    return result;
  };

  useEffect(() => {
    if (dataDetail && dataDetail.images[0]) {
      setImages(() => {
        const temp = dataDetail.images.map((item) => {
          return item.thumbs[1];
        });
        return temp;
      });
      setImgId(dataDetail.images.map((item) => +item.id));
    }
    return;
  }, [dataDetail]);

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={images}
        rules={{ required: { value: true, message: 'This field is required' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <List style={{ display: 'flex', flexWrap: 'wrap', height: '100%' }}>
                {images.map((image: any, index: number) => (
                  <ListItem key={index} style={{ height: '124px', width: '122px', padding: '0', marginRight: '12px' }}>
                    <img src={image} style={{ objectFit: 'cover', height: '100%', width: '100%', padding: '0' }} />
                    <div
                      onClick={() => {
                        onChange(handleRemoveImgUpload(value, index));
                        console.log(value);
                      }}
                    >
                      <CancelIcon
                        fontSize="small"
                        style={{ color: 'grey', position: 'absolute', top: '-6px', right: '-5px', cursor: 'pointer' }}
                      />
                    </div>
                  </ListItem>
                ))}
                <Dropzone
                  multiple={true}
                  onDrop={(file: File[]) => {
                    handleDropImg(file);
                    onChange(handleUpload(file));
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="add-image-box">
                      <CameraAltIcon />
                      <div className="border-camera-icon"></div>
                      <input type="file" {...getInputProps()} multiple={true} name={name} onBlur={onBlur} />
                    </div>
                  )}
                </Dropzone>
              </List>
            </div>
          </>
        )}
      />
    </>
  );
};

export default DropInput;
