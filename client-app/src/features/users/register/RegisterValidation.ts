import * as Yup from 'yup';

export const registerValidation = [
    Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string().required("Email is required").email(),
        password: Yup.string().required("Password is required"),
        companyLegalName: Yup.string().required("Legal business name is required"),
        displayName: Yup.string().required("Displayname is required").max(20, "Display name must be under 20 characters"),
        legalCompanyAddress: Yup.object({
            postalCode: Yup.string().when("postalCode", {
                is: null,
                then: Yup.string().required("Postcode is required")
            }) 
        })
    }),
    Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string().required("Email is required").email("Email must be a valid email"),
        password: Yup.string().required("Password is required"),
    }),
    Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string().required("Email is required").email("Email must be a valid email"),
        password: Yup.string().required("Password is required"),
    })
] 