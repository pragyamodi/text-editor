import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";

const ALLOWED_ELEMENT_TYPES = ["list-item", "numbered-list"];

const Element = ({ attributes, children, element, margin, padding }) => {
  if (!ALLOWED_ELEMENT_TYPES.includes(element.type)) {
    return null;
  }

  const listItemStyle = {
    paddingLeft: padding,
    marginLeft: margin,
  };

  if (element.type === "list-item") {
    return (
      <li style={listItemStyle} {...attributes}>
        {children}
      </li>
    );
  }

  return <ol {...attributes}>{children}</ol>;
};

export function ListEditor({ margin, padding }) {
  const [value, setValue] = useState<Node[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(
    (props) => {
      const propsWithPaddingAndMargin = { ...props, padding, margin };
      return <Element {...propsWithPaddingAndMargin} />;
    },
    [padding, margin]
  );

  return (
    <div>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Editable renderElement={renderElement} spellCheck autoFocus />
      </Slate>
    </div>
  );
}

const initialValue = [
  {
    type: "numbered-list",
    children: [{ type: "list-item", children: [{ text: "" }] }],
  },
];

export default ListEditor;
