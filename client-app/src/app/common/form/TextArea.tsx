import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'
interface IProps extends FieldRenderProps<string,HTMLTextAreaElement>,FormFieldProps {
}
 const TextArea:React.FC<IProps> = ({input,rows,placeholder,width,meta:{touched,error}}) => {
   
    return (
        <Form.Field error={touched && !!error}>
        <textarea 
         {...input} 
         placeholder={placeholder}
         rows={rows}
        />
         {touched && error && (
             <Label basic color='red'>
              {error}
             </Label>
         )}
       
       </Form.Field>
    )
}
export default TextArea;