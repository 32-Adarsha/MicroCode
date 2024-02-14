import { Input,Stack } from '@chakra-ui/react'


const PasswordInput = (props) =>{


    return(
        <div>
            <Stack spacing={4}>
            <label htmlFor={props.id}>{props.label}:</label>
            <Input type="password"  id={props.id} variant='flushed'/>
            </Stack>
        </div>
    )
}

export default PasswordInput


