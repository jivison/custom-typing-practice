import React, { useState } from "react";
import Create from "./Create/Create";
import Type from "./Type/Type";
import "./TypingPractice.sass"

function TypingPractice() {
    // Should be either create/type
    const [mode, setMode] = useState("type");
    const [content, setContent] = useState("엄마가, 아빠가");

    return mode === "create" ? (
        <Create setMode={setMode} setContent={setContent} />
    ) : (
        <Type setMode={setMode} content={content} />
    );
}

export default TypingPractice;
