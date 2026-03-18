import { useRef, useMemo } from 'react'
import JoditEditor from 'jodit-react'

const TextEditor = (props) => {

    const editor = useRef(null)

    return (
        <JoditEditor
            ref={editor}
            value={props.value}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) =>props.onBlur(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) =>props.onChange(newContent)}
        />
    )
}
export default TextEditor