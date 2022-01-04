import React from 'react'

const SectionHeader = ({img, text}) => {
    return (
        <>
            <div 
                className="section-header"
                style={{
                    backgroundImage: img
                }}
            >
                <span style={{
                    marginTop: "70px", 
                    color: "#FFF", 
                    fontWeight: "600",
                    fontSize: "45px",
                    marginBottom: "5px"
                }}>
                    {text}
                </span>
                <div className="section-header-line" />
            </div>
        </>
    )
}

export default SectionHeader