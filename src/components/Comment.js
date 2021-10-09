import React from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { nanoid } from "nanoid";

const Comment = props => {
    const TextOfComment = ({ text }) => {
        const html = text;

        return (ReactHtmlParser(html))
    }

    const Child = content => {
        const hasChildren = content && (content.children.length > 0);
        const isText = content.text && (content.text.length > 0);
        console.log(`Has ${content.children.length} Children`)

        return (<>
            {isText && hasChildren && content.children.map(child => (
                <li>
                    <ul key={nanoid()} >
                        <TextOfComment text={child.text} />
                        <Child {...child} />
                        {console.log(child)}
                    </ul>
                </li>
            ))}
        </>
        )
    }

    return (
        <div>
            {props.comment && props.comment.map((entry) => Child(entry))}
            <hl />
        </div>
    )
}

export default Comment
