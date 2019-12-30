import React, { useState } from "react";

function Type({ content }) {
    const [renderedContent, setRenderedContent] = useState([]);

    const calculateContent = userContent => {
        if (
            renderedContent.length > 5 &&
            renderedContent.length - userContent.length < 3
        ) {
            setRenderedContent(
                renderedContent.slice(0, userContent.length - 3).concat([
                    ...userContent
                        .split("")
                        .slice(userContent.length - 3)
                        .map((val, idx) => {
                            let realIdx = renderedContent.length - (2 - idx);
                            let colour =
                                content.charAt(realIdx) === val
                                    ? "green"
                                    : "red";
                            return (
                                <span style={{ color: colour }} key={realIdx}>
                                    {val.replace(/ /g, "\u00a0")}
                                </span>
                            );
                        })
                ])
            );
        } else {
            setRenderedContent([
                ...userContent.split("").map((val, idx) => {
                    let colour = content.charAt(idx) === val ? "green" : "red";
                    return (
                        <span style={{ color: colour }} key={idx}>
                            {val.replace(/ /g, "\u00a0")}
                        </span>
                    );
                })
            ]);
        }
    };

    const inputHandler = e => {
        calculateContent(e.target.value);
    };

    return (
        <div>
            <p>{content}</p>
            <p>{renderedContent}</p>
            <input
                onInput={inputHandler}
                type="text"
                placeholder="Start typing here!"
            />
        </div>
    );
}

export default Type;

// if (userContent.length > 3) {
//     setRenderedContent(
//         renderedContent.slice(0, renderedContent.length - 3).concat(
//             userContent
//                 .split("")
//                 .slice(renderedContent.length - 3)
//                 .map((val, idx) => {
// let colour =
//     content.charAt(idx) === val ? "green" : "red";

//                     return (
//                         <span key={idx} style={{ color: colour }}>
//                             {val}
//                         </span>
//                     );
//                 })
//         )
//     );
// } else {
//     setRenderedContent(
//         userContent.split("").map((val, idx) => {
//             let colour = content.charAt(idx) === val ? "green" : "red";

//             return (
//                 <span key={idx} style={{ color: colour }}>
//                     {val}
//                 </span>
//             );
//         })
//     );
// }
