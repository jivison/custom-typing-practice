import React from "react";
import "./Create.sass";

let regexs = {
    replaceAllWhitespace: { regex: /\s/gm, replacement: " " },
    noDoubleSpaces: { regex: / +/g, replacement: " " },
    latinCharsAndPunc: { regex: /[^\w,.?!:;'"()[\]] ]/g, replacement: "" },
    latinCharsNoPunc: { regex: /[^\w ]/g, replacement: "" },
    noPunctuation: {regex: /[,.?!:;'()[\]]/g, replacement: ""}
};

function Create({ setMode, setContent }) {
    document.title = "Typing - Create!";

    const submitHandler = e => {
        e.preventDefault();

        let formData = new FormData(e.target);

        let content = formData.get("content");

        for (let regexKey in regexs) {
            if (formData.get(regexKey)) {
                content = content.replace(
                    regexs[regexKey].regex,
                    regexs[regexKey].replacement
                );
            }
        }

        setContent(content);
        setMode("type");
    };

    return (
        <form onSubmit={submitHandler}>
            <h1>Enter your text to type:</h1>
            <div>
                <textarea name="content" className="contentField"></textarea>
            </div>
            <div>
                <label htmlFor="replaceAllWhitespace">
                    Replace all whitespace with a normal space
                </label>
                <input type="checkbox" defaultChecked name="replaceAllWhitespace" />
            </div>
            <div>
                <label htmlFor="noDoubleSpaces">
                    Replace more than one space with a single one
                </label>
                <input type="checkbox" defaultChecked name="noDoubleSpaces" />
            </div>
            <div>
                <label htmlFor="latinCharsAndPunc">
                    Latin characters only (with basic punctuation)
                </label>
                <input type="checkbox" name="latinCharsAndPunc" />
            </div>
            <div>
                <label htmlFor="latinCharsAndPunc">Latin characters only</label>
                <input type="checkbox" name="latinCharsAndPunc" />
            </div>
            <div>
            <label htmlFor="noPunctuation">No punctuation</label>
            <input type="checkbox" name="noPunctuation" />
        </div>
            <br />
            <div>
                <input type="submit" className="button" />
            </div>
        </form>
    );
}

export default Create;
