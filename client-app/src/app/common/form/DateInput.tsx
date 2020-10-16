import React from 'react';
import { FieldRenderProps } from 'react-final-form'
import { DateTimePicker } from 'react-widgets';

import { Form, FormFieldProps } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<Date,HTMLInputElement>,FormFieldProps {

}
 const DateInput:React.FC<IProps> = ({input,width,placeholder,meta:{touched,error},}) => {
    return (
    <Form.Field error={touched && !!error}>
     <DateTimePicker
     placeholder={placeholder}
     value={input.value || null}
     onChange={input.onChange}
     
     />     
     </Form.Field>
    )
}
export default DateInput;