import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
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


const initialValuesUpload = {
  userId:"",
  picture: "",
  productName: "",
  productPrice: "",
  productRating: "",
  purchaseDate: "",
  productReview: ""
};

const UploadWidget = () => {
  const { _id } = useSelector((state) => state.user);
  console.log(_id);
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const upload = async(values, onSubmitProps) => {
    //console.log(values);
    const formData = new FormData();

    for(let value in values) {
      //console.log(value);
      formData.append(value, values[value]);
    }

    formData.append("picturePath", values.picture.name);
    formData.append("userId", _id);


    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    

    const savedUserResponse = await fetch("http://localhost:3001/auth/upload", { method: "POST", body: formData })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
      //console.log(values);
      await upload(values,onSubmitProps);
  };

  return (
    <Formik
    onSubmit={handleFormSubmit}
    initialValues={initialValuesUpload}
    
  >
    {({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue,
      resetForm,
    }) => (
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {  (
            <>
              <TextField
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productName}
                name="productName"
                error={
                  Boolean(touched.productName) && Boolean(errors.productName)
                }
                helperText={touched.productName && errors.productName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Product Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productPrice}
                name="productPrice"
                error={Boolean(touched.productPrice) && Boolean(errors.productPrice)}
                helperText={touched.productPrice && errors.productPrice}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Rating"
                onBlur={handleBlur}productRating
                onChange={handleChange}
                value={values.productRating}
                name="productRating"
                error={Boolean(touched.productRating) && Boolean(errors.productRating)}
                helperText={touched.productRating && errors.productRating}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Purchase Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.purchaseDate}
                name="purchaseDate"
                error={
                  Boolean(touched.purchaseDate) && Boolean(errors.purchaseDate)
                }
                helperText={touched.purchaseDate && errors.purchaseDate}
                sx={{ gridColumn: "span 4" }}
              />
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values.picture.name}</Typography>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            </>
          )}

          <TextField
            label="Review"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.productReview}
            name="productReview"
            error={Boolean(touched.productReview) && Boolean(errors.productReview)}
            helperText={touched.productReview && errors.productReview}
            sx={{ gridColumn: "span 4" }}
          />
          
        </Box>

        {/* BUTTONS */}
        <Box>
          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
         
          </Button>
          <Typography
            onClick={() => {
             
              resetForm();
            }}
            sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.light,
              },
            }}
          >
            
          </Typography>
        </Box>
      </form>
    )}
  </Formik>
  )

};

export default UploadWidget;
