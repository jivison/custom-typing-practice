import React from "react";

function Create({ setMode, setContent }) {
    const submitHandler = e => {
        e.preventDefault();

        let formData = new FormData(e.target);

        setContent(formData.get("content"));
        setMode("type");
    };

    return (
        <form
            onSubmit={submitHandler}
        >
            <h1>Enter your text to type:</h1>
            <textarea name="content" />
            <br />
            <input type="submit" />
        </form>
    );
}

export default Create;
