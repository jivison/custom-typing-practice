import React, { useState } from "react";
import Create from "./Create/Create";
import Type from "./Type/Type";
import "./TypingPractice.sass"

function TypingPractice() {
    // Should be either create/type
    const [mode, setMode] = useState("create");
    const [content, setContent] = useState("");

    return mode === "create" ? (
        <Create setMode={setMode} setContent={setContent} />
    ) : (
        <Type setMode={setMode} content={content} />
    );
}

export default TypingPractice;
