import React from 'react';
import { IMaskInput } from 'react-imask';
import TextField from 'ui/components/inputs/TextField/TextField';
import { OutlinedTextFieldProps } from '@mui/material';

export interface TextFieldMaskProps extends Omit<OutlinedTextFieldProps, 'value' | 'variant'> {
    mask: string;
    value?: string;
}

interface MaskAdapterProps {
    mask: string;
    name: string;
    onChange: (event: { target: { name: string; value: string } }) => void;
}

/**
 * Adapta o IMaskInput para a interface de input esperada pelo Material UI:
 * o MUI passa `ref` e espera um `onChange` no formato de evento de formulario.
 */
const MaskAdapter = React.forwardRef<HTMLInputElement, MaskAdapterProps>(
    function MaskAdapter({ onChange, mask, name, ...props }, ref) {
        return (
            <IMaskInput
                {...props}
                mask={mask}
                definitions={{ '9': /[0-9]/ }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name, value: value as string } })}
                overwrite
            />
        );
    }
);

const TextFieldMask: React.FC<TextFieldMaskProps> = ({ mask, slotProps, ...props }) => {
    return (
        <TextField
            {...props}
            variant={'outlined'}
            slotProps={{
                ...slotProps,
                input: {
                    ...slotProps?.input,
                    inputComponent: MaskAdapter as never,
                    inputProps: { mask },
                },
            }}
        />
    );
};

export default TextFieldMask;
