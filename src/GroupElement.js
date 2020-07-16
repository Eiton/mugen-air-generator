import React from 'react';
export default function GroupElement(props) {
  const { child } = props;
  return(
    <div style={{position:"relative"}}>
      <span style={{
        position:"absolute",
        left:"10px",
        top:"-14px"
      }}>Animation Data</span>
      <div style={{
        borderWidth:"1px",
        borderColor:"#C0C0C0",
        borderStyle:"solid",
        borderRadius:"10px",
        padding:"5px",
        position:"relative",
        overflow:"hidden"
      }}>
        {child}
      </div>
      
    </div>
  );
}