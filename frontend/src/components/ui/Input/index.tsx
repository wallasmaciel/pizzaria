import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

import { NextPage } from "next"
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
// 
const Input = ({ ...rest }: InputProps) => {
    return (
        <input className={ styles.input } {...rest} />
    )
}

const TextArea: NextPage = ({ ...rest }: TextAreaProps) => {
    return (
        <textarea className={ styles.input } {...rest} />
    )
}

export { Input, TextArea }