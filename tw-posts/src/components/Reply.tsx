import * as React from "react";

interface IProps {
    content: string
}

export default function Reply(props: IProps) {
    return (<div>
        {props.content}
    </div>);
}