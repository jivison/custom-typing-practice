import React, { useState } from "react";
import "./Type.sass";

// These styles dictate what a character should look like when correct/incorrect/neutral
const styles = {
    correct: { backgroundColor: "#cbf2b2" },
    incorrect: { backgroundColor: "#f2b9b2" },
    neutral: { color: "black" }
};

// Check's whether a char is correct or not, and returns the approriate styles
function getColour(char, content, idx) {
    return content.charAt(idx) === char ? styles.correct : styles.incorrect;
}

// HTML-space sanitized version of getChar()
function getChar(content, index) {
    return content.charAt(index).replace(/ /g, "\u0020");
}

function Type({ content, setMode }) {
    document.title = "Typing - Type!";

    // The content rendered (an array of <span/>s)
    const [renderedContent, setRenderedContent] = useState([]);

    // Used to check if multiple keys are/aren't changing the length
    // (Like on the korean keyboard, you hit multiple keys to generate a single character)
    const [lenStore, setLenStore] = useState(0);

    // Used to chcek if a character is changing/being deleted in the middle of the string
    const [valueStore, setValueStore] = useState("");

    const inputHandler = ({ target, nativeEvent }) => {
        const { value } = target;
        const { inputType } = nativeEvent;

        let valueBut1 = value
            .split("")
            .slice(0, value.length - 1)
            .join("");
        let valueStoreBut1 = valueStore
            .split("")
            .slice(0, value.length - 1)
            .join("");

        // Refer to ifstatement.js for more details
        if (
            valueStore.length === value.length &&
            (!(
                (valueBut1 === valueStore &&
                    value.length > valueStore.length) ||
                (valueBut1 !== valueStore &&
                    value.length < valueStore.length &&
                    valueStoreBut1 === valueBut1)
            ) ||
                Math.abs(renderedContent.length - value.length) > 1)
        ) {
            // Iterate over each character of the input, checking against the content (the master copy)
            // Set the style according to whether they match or not
            // (Re-rendering is very laggy, so it is only done when necessary)
            setRenderedContent(
                content
                    .slice(0, value.length)
                    .split("")
                    .map((val, idx) => (
                        <span
                            style={getColour(value.charAt(idx), content, idx)}
                            key={Math.random()}
                        >
                            {
                                // '\u00a0' is used instead of a space, so the html can render the string correctly
                            }
                            {val.replace(/ /g, "\u0020")}
                        </span>
                    ))
            );
        } else {
            // If the user deletes something
            if (
                inputType === "deleteContentBackward" ||
                inputType === "deleteContentForward"
            ) {
                // If there is still something left in the input box
                if (value.length > 0) {
                    // The hard deletion logic is handled above (in the parent if/else)
                    // So it is assumed it was a simple deletion (just the last character deleted)
                    setRenderedContent(
                        renderedContent.slice(0, renderedContent.length - 1)
                    );
                } else {
                    // If the user has deleted the entire input, remove all rendered content
                    setRenderedContent([]);
                }
            } else {
                // Index is the the last index of the input box
                let index = value.length - 1;
                // Char is the last character of the input box
                let char = value.charAt(index);

                // If the end of the input has changed, but the length is the same
                // Re-render the last character
                if (value.length !== 0 && lenStore === value.length) {
                    setRenderedContent([
                        ...renderedContent.slice(0, index),
                        <span
                            style={getColour(char, content, index)}
                            key={Math.random()}
                        >
                            {getChar(content, index)}
                        </span>
                    ]);
                } else {
                    // Otherwise the user has just added a character at the end
                    // So append it to the rendered content

                    setRenderedContent([
                        ...renderedContent,
                        <span
                            style={getColour(char, content, index)}
                            key={Math.random()}
                        >
                            {getChar(content, index)}
                        </span>
                    ]);
                }
            }
        }

        // Set the lenStore and valueStore (used to check weird input behavior described at declaration)
        setLenStore(value.length);
        setValueStore(value);
    };

    return (
        <div className="typeContainer">
            <button onClick={() => setMode("create")}>Re-create</button>
            <p className="content">
                <span className="renderedContent">{renderedContent}</span>
                <span className="masterContent" style={styles.neutral}>
                    {
                        // '\u00a0' is used instead of a space, so the html can render the string correctly
                        // Whatever is left of the content is displayed, so the user knows what to type
                    }
                    {content
                        .split("")
                        .slice(renderedContent.length)
                        .join("")
                        .replace(/ /g, "\u0020")}
                </span>
            </p>
            <div className="inputContainer">
                <input
                    autoComplete="false"
                    autoCorrect="false"
                    autoFocus
                    className="typeInput"
                    onInput={inputHandler}
                    type="text"
                    placeholder="Start typing here!"
                />
                <span className="count">
                    {" "}
                    {renderedContent.length}/{content.length}
                </span>
            </div>
        </div>
    );
}

export default Type;
