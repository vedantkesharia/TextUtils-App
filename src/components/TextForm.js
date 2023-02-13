import React, { useState } from 'react'

export default function TextForm(props) {
    const handleUpClick = () => {
        // console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Uppercase!", "success");
    }

    const handleLowClick = () => {
        // console.log("Lowercase was clicked" + text);
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lowercase!", "success");
    }

    const clearAllText = () => {
        // console.log("Lowercase was clicked" + text);
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    }

    const handleCopy = () => {
        var text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        document.getSelection().removeAllRanges();
        props.showAlert("Copied To Clipboard!", "success");
    }

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
        props.showAlert("Extra Spaces Removed!", "success");
    }

    // const speak = () => {
    //     let msg = new SpeechSynthesisUtterance(text);
    //     const toogle = document.getElementById("myBox");
    //     if ((toogle.textContent === "Speak")) {
    //         window.speechSynthesis.speak(msg);
    //         toogle.textContent = "Stop";
    //            console.log("play");
    //     } else {
    //         toogle.textContent = "Speak";
    //         window.speechSynthesis.cancel();
    //           console.log("stop");
    //     }
    // };

    const speak = () => {
        let msg = new SpeechSynthesisUtterance(text);
        const toogle = document.getElementById("myBox");
        toogle.textContent = "Speak";
        if ((toogle.textContent === "Speak")) {
            window.speechSynthesis.speak(msg);
            toogle.textContent = "Stop";
               console.log("play");
        } else {
            window.speechSynthesis.cancel();
              console.log("stop");
        }
    };

    const handleOnChange = (event) => {
        //  console.log("On change");
        setText(event.target.value);
    }

    const [text, setText] = useState('');
    // setText("new text");  ....(coreect wa to change state)
    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#2C3333' }}>
                <h1 className="mb-4">{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#2F2F30' : 'white', color: props.mode === 'dark' ? 'white' : '#2C3333' }} id="myBox" rows="8"></textarea>
                </div>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert To Uppercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleLowClick}>Convert To Lowercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={clearAllText}>Clear Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={speak}>Text To Speech</button>
            </div>
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#2C3333' }}>
                <h2>Your text summary</h2>
                <p>{text.split(" ").filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").filter((element) => { return element.length !== 0 }).length} minutes read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
            </div>
        </>
    )
}
