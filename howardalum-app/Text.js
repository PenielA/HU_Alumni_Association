import React, { useState } from 'react';
import { Button } from '@material-ui/core';

function Text({ promptText }) {
    const { text, setText } = useState("none")


    function getUserID() {
        const promptResponse = prompt(promptText);
        console.log(promptResponse);
    }
    console.log(text);
   
    return (
        <Button style={{ color: "white" }} onClick={() => getUserID()}>{promptText}</Button>
        )
}

export default Text