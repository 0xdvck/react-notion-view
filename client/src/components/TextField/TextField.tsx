
type TextFieldProps = {
    onChange: (value: string) => void,
    value?: string
    type?: string
}

export const TextField = ({ onChange, value, type = 'text' }: TextFieldProps) => {
    return <input type={type} value={value} onChange={(e) => onChange && onChange(e.target.value)} />;
}