import {Editor} from "@tinymce/tinymce-react";
import {useEffect, useState} from "react";

export const BodyEditor = ({initialValue, onEdit, field}) => {

  const [value, setValue] = useState()

  useEffect(() => {
    setValue(initialValue ?? '')
  }, [initialValue]);

  return <Editor
    apiKey="aywo416v6fszmnbeapee6mhh1rusgyfzjbdetttu6qydo8pu"
    value={initialValue}
    onEditorChange={(newValue, editor)=>{
      onEdit(newValue)
      setValue(newValue)
    }}
    init={{
      height: field === 'body' ? 500 : 150,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | blocks |' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help |'+
        'image',
    }}
  />
}
