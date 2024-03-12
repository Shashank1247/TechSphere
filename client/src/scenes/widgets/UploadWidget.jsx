import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const UploadWidget = () => {
  const { _id } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValuesUpload = {
    userId: _id,
    picture: "",
    productName: "",
    productPrice: "",
    productRating: "",
    purchaseDate: "",
    productReview: "",
  };

  const upload = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }

    formData.append("picturePath", values.picture.name);

    const response = await fetch("http://localhost:3001/auth/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      onSubmitProps.resetForm();
      navigate(`/profile/${_id}`);
    } else {
      // Handle server errors or invalid responses
      console.error('Upload failed:', await response.text());
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await upload(values, onSubmitProps);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        sx={{
          p: 2,
          bgcolor: palette.background.paper,
          borderRadius: '8px',
          boxShadow: '0px 0px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Formik initialValues={initialValuesUpload} onSubmit={handleFormSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              {/* Product Name */}
              <TextField
                fullWidth
                label="Product Name"
                name="productName"
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.productName && Boolean(errors.productName)}
                helperText={touched.productName && errors.productName}
                margin="normal"
              />

              {/* Product Price */}
              <TextField
                fullWidth
                label="Product Price"
                name="productPrice"
                value={values.productPrice}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.productPrice && Boolean(errors.productPrice)}
                helperText={touched.productPrice && errors.productPrice}
                margin="normal"
              />

              {/* Product Rating */}
              <TextField
                fullWidth
                label="Rating"
                name="productRating"
                value={values.productRating}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.productRating && Boolean(errors.productRating)}
                helperText={touched.productRating && errors.productRating}
                margin="normal"
              />

              {/* Purchase Date */}
              <TextField
                fullWidth
                label="Purchase Date"
                name="purchaseDate"
                type="date"
                value={values.purchaseDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.purchaseDate && Boolean(errors.purchaseDate)}
                helperText={touched.purchaseDate && errors.purchaseDate}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {/* Product Review */}
              <TextField
                fullWidth
                label="Review"
                name="productReview"
                multiline
                minRows={3}
                value={values.productReview}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.productReview && Boolean(errors.productReview)}
                helperText={touched.productReview && errors.productReview}
                margin="normal"
              />

              {/* Image Upload */}
              <Dropzone
                onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    sx={{
                      mt: 2,
                      mb: 2,
                      p: 2,
                      border: '1px dashed',
                      borderColor: palette.primary.main,
                      bgcolor: palette.background.default,
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <Typography>Add Picture Here</Typography>
                    ) : (
                      <Typography>{values.picture.name}</Typography>
                    )}
                  </Box>
                )}
              </Dropzone>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UploadWidget;
