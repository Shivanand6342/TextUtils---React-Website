import React, {useState} from 'react'

export default function TextForm(props) {
    const [text, setText] = useState("")

    const convertingUppercase = () => {
        let newText = text.toUpperCase()
        setText(newText)
        props.showAlert("Text Converted to UpperCase", "success")
    }

    const convertingLowercase = () => {
        let newText = text.toLowerCase()
        setText(newText)
        props.showAlert("Text Converted to LowerCase", "success")
    }

    const clearingText = () => {
        let newText = ''
        setText(newText)
        props.showAlert("Text Cleared", "success")
    }

    const speakingText = () => {
        let newText = new SpeechSynthesisUtterance()
        newText.text = text;
        window.speechSynthesis.speak(newText)
    }

    const reversingText = (e) => {
        let textArr = text.split("")
        textArr = textArr.reverse()
        let newText = textArr.join("")
        setText(newText)
        props.showAlert("Text Reversed", "success")
    }

    const copyingText = () => {
        var text = document.getElementById('myBox')
        text.select()
        navigator.clipboard.writeText(text.value)
        props.showAlert("Text Copied to Clipboard", "success")
    }

    const removingExtraSpaces = () => {
        let newText = text.split(/[ ]+/)
        setText(newText.join(" "))
        props.showAlert("Extra Spaces Removed", "success")
    }
    
    const handleOnChanged = (e) => {
        console.log("On Changed")
        setText(e.target.value)
    }

    return (
        <>
        <div className="container" style={{color: props.mode === 'dark'?'white':'#042743'}}>
            <div className="my-3">
                <h1>{props.heading}</h1>
            </div>
            <div className="mb-3 my-3">
                <textarea className="form-control" value={text} onChange={handleOnChanged} style={{backgroundColor: props.mode === 'dark'?'#042743':'white', color: props.mode === 'dark'?'white':'#042743'}} id="myBox" rows="7"></textarea>
            </div>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={speakingText}>Read</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={convertingUppercase}>Convert to UPPERCASE</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={convertingLowercase}>Convert to lowercase</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={clearingText}>Clear Text</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={reversingText}>Reverse Text</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={copyingText}>Copy Text</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={removingExtraSpaces}>Remove Extra Spaces</button>
        </div>

        <div className="container my-5" style={{color: props.mode === 'dark'?'white':'#042743'}}>
            <h3>Your Text Contains:</h3>
            <p className="my-4">Total {text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>Normal reader can read the whole content in {0.008 * (text.split(" ").filter((element)=>{return element.length!==0}).length)} minutes</p>
            <h2>Preview of you Text</h2>
            <p className="my-3">{text.length > 0 ? text : "Enter something in the box to preview here..."}</p>
        </div>
        </>
    )
}
