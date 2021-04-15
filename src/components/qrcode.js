import React from 'react';

function QrCode(props){
    return(
        <div>
            <img src={props.qrcode_url} alt="" title="" />
        </div>
    )
}
export default QrCode;