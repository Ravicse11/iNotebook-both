import React from 'react'

export default function Alert(props) {
    const Capitalize = (word) => {
        if (word === "danger") { word = "error!" }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{ height: "40px" }} >
            {props.alert && <div>
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{Capitalize(props.alert.type)}</strong> {props.alert.msg}
                    {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
                </div>
            </div>}
        </div>
    )
}
