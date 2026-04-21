const {useState,useRef,useEffect}=React;

function BulletList(props){
  var items=props.items, color=props.color, small=props.small;
  if(!items||items.length===0) return null;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:3}}>
      {items.map(function(item,i){
        return (
          <div key={String(item).slice(0,80)+"-"+i} style={{display:"flex",gap:5,alignItems:"flex-start"}}>
            <span style={{color:color,flexShrink:0,marginTop:3,fontSize:7}}>•</span>
            <span style={{fontSize:small?10.5:11.5,color:"#c8cfe0",lineHeight:1.6}}>{item}</span>
          </div>
        );
      })}
    </div>
  );
}

function PanelEmpty(props){
  var text=props.text||"명확한 항목 없음";
  return <div style={{fontSize:11,color:"#2e374f",fontStyle:"italic",padding:"3px 0"}}>{text}</div>;
}

function SubLabel(props){
  var icon=props.icon, title=props.title, color=props.color;
  return (
    <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",
      color:color,fontFamily:"'JetBrains Mono',monospace",
      marginBottom:3,display:"flex",alignItems:"center",gap:4}}>
      <span>{icon}</span>{title}
    </div>
  );
}

function PanelCard(props){
  var title=props.title, icon=props.icon, loading=props.loading;
  var borderColor=props.borderColor, headerBg=props.headerBg, children=props.children;
  return (
    <div style={{border:"1px solid #1e2538",borderLeft:"3px solid "+borderColor,
      borderRadius:10,overflow:"hidden",marginBottom:8}}>
      <div style={{padding:"6px 11px",background:headerBg,borderBottom:"1px solid #1e2538",
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:11}}>{icon}</span>
          <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",
            color:"#94a3b8",fontFamily:"'JetBrains Mono',monospace"}}>{title}</span>
        </div>
        {loading&&(
          <div style={{display:"flex",alignItems:"center",gap:4,fontSize:9,color:"#4a5268"}}>
            <span style={{width:8,height:8,border:"1.5px solid #252d42",
              borderTopColor:"#60a5fa",borderRadius:"50%",display:"inline-block",
              animation:"spin .65s linear infinite"}}/>
            갱신 중
          </div>
        )}
      </div>
      <div style={{padding:"8px 11px",maxHeight:175,overflowY:"auto"}}>
        {children}
      </div>
    </div>
  );
}
