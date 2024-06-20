import React from "react"
import { Editor } from "@tinymce/tinymce-react"

export default function Write() {
  return (
    <div className="h-screen">
      <Editor
        apiKey="x9pqoh2r51vhqgmmbe2h6yd8f6q8uv69iklykuwdelhzp8f2"
        init={{
          height: 500,
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | help",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
        }}
        initialValue=""
      />
    </div>
  )
}
