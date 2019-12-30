import React, { useState } from "react";
import Create from "./Create";
import Type from "./Type";

function TypingPractice() {
    // Should be either create/type
    const [mode, setMode] = useState("type");
    const [content, setContent] = useState("This is a test of the typing practice");

    return mode === "create" ? (
        <Create setMode={setMode} setContent={setContent} />
    ) : (
        <Type content={content} />
    );
}

export default TypingPractice;
