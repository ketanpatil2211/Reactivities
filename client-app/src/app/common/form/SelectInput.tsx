import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label,Select } from 'semantic-ui-react'
interface IProps extends FieldRenderProps<string,HTMLSelectElement>,FormFieldProps {
}
export const SelectInput:React.FC<IProps> = ({input,options,placeholder,width,meta:{touched,error}}) => {
    return (
        <Form.Field error={touched && !!error}>
        <Select 
        value={input.value}
        onChange={(e,data)=> input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        />
         {touched && error && (
             <Label basic color='red'>
              {error}
             </Label>
         )}
       
       </Form.Field>
    )
}
