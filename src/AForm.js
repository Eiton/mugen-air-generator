import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  withoutLabel: {
    marginTop: theme.spacing(2),
  },
}));
export default function AForm() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    Tab:0,
    OffsetXY: true,
    sizeXY: true,
    SpriteGroup:0,
    SpriteIndexS:0,
    SpriteIndexE:0,
    AnimTime:1,
    Flip:"None",
    OffsetXInit:0,
    OffsetXROC:0,
    OffsetXAcc:0,
    OffsetYInit:0,
    OffsetYROC:0,
    OffsetYAcc:0,
    SizeXInit:1,
    SizeXROC:0,
    SizeXAcc:0,
    SizeYInit:1,
    SizeYROC:0,
    SizeYAcc:0,
    AngleInit:0,
    AngleROC:0,
    AngleAcc:0,
    Transparency:"None",
    AlphaS:256,
    AlphaD:256,
    FadeIn:false,
    FadeInTime:5,
    FadeOut:false,
    FadeOutTime:5,
    air:""
  });
  const generateAir = (event) => {
    var time = 0;
    const maxTime = (state.SpriteIndexE - state.SpriteIndexS+1)*state.AnimTime;
    var air = "";
    var offsetX = parseFloat(state.OffsetXInit);
    var offsetY = parseFloat(state.OffsetYInit);
    var offsetXROC = parseFloat(state.OffsetXROC);
    var offsetYROC = parseFloat(state.OffsetYROC);
    var sizeX = parseFloat(state.SizeXInit);
    var sizeY = parseFloat(state.SizeYInit);
    var sizeXROC = parseFloat(state.SizeXROC);
    var sizeYROC = parseFloat(state.SizeYROC);
    var angle = parseFloat(state.AngleInit);
    var angleROC = parseFloat(state.AngleROC);
    var alphaS = parseInt(state.FadeIn?0:state.AlphaS);
    var alphaD = parseInt(state.AlphaD);//(state.FadeIn?256:state.AlphaD);
    for(var i=state.SpriteIndexS;i<=state.SpriteIndexE;i++){
      for(var j=0;j<state.AnimTime;j++){
          air = air+state.SpriteGroup+","+i+","+Math.round(offsetX)+","+Math.round(offsetY)+",1,"+(state.Flip=="None"?"":state.Flip)+",";
          if(state.Transparency === "Sub"){
              air = air+"S"
          }else if(state.Transparency === "Add"){
              air = air+"AS"+Math.floor(alphaS)+"D"+Math.floor(alphaD);
          }else if(state.Transparency === "None" && alphaS != 256){
              air = air+"AS"+Math.floor(alphaS)+"D"+(256-Math.floor(alphaS));
          }
          air = air+","+(+sizeX.toFixed(4))+","+(+sizeY.toFixed(4))+","+(+angle.toFixed(2))+"\n";
          offsetX += offsetXROC;
          offsetY += offsetYROC;
          offsetXROC += parseFloat(state.OffsetXAcc);
          offsetYROC += parseFloat(state.OffsetYAcc);
          sizeX += sizeXROC;
          sizeY += sizeYROC;
          sizeXROC += parseFloat(state.SizeXAcc);
          sizeYROC += parseFloat(state.SizeYAcc);
          angle += angleROC;
          angleROC += parseFloat(state.AngleAcc);
          if(state.FadeIn){
            if(time < state.FadeInTime){
              alphaS += parseFloat(state.AlphaS)/parseFloat(state.FadeInTime)
            }else if(time == state.FadeInTime){
              alphaS = parseFloat(state.AlphaS);
            }
          }
          if(state.FadeOut){
            if(maxTime-time <= state.FadeOutTime){
              alphaS -= parseFloat(state.AlphaS)/parseFloat(state.FadeOutTime)
            }
          }
          time+=1;
      }
    }
    setState({ ...state, air: air });
  }
  const handleReset = (event) => {
    console.log("reset")
    setState({ 
      ...state,
      OffsetXY: true,
      sizeXY: true,
      SpriteGroup:0,
      SpriteIndexS:0,
      SpriteIndexE:0,
      AnimTime:1,
      Flip:"None",
      OffsetXInit:0,
      OffsetXROC:0,
      OffsetXAcc:0,
      OffsetYInit:0,
      OffsetYROC:0,
      OffsetYAcc:0,
      SizeXInit:1,
      SizeXROC:0,
      SizeXAcc:0,
      SizeYInit:1,
      SizeYROC:0,
      SizeYAcc:0,
      AngleInit:0,
      AngleROC:0,
      AngleAcc:0,
      Transparency:"None",
      AlphaS:256,
      AlphaD:256,
      FadeIn:false,
      FadeInTime:5,
      FadeOut:false,
      FadeOutTime:5
    });
  }
  const handleChangeSizeXY = (event) => {
    if(event.target.checked){
      setState(function(prevState: any){return{...prevState,SizeYInit:state.SizeXInit,SizeYROC:state.SizeXROC,SizeYAcc:state.SizeXAcc,sizeXY:true}})
    }else{
      setState({ ...state, [event.target.name]: event.target.checked });
    }
  };
  const handleChangeOffsetXY = (event) => {
    if(event.target.checked){
      setState(function(prevState: any){return{...prevState,OffsetYInit:state.OffsetXInit,OffsetYROC:state.OffsetXROC,OffsetYAcc:state.OffsetXAcc,OffsetXY:true}})
    }else{
      setState({ ...state, [event.target.name]: event.target.checked });
    }
  };
  const handleChangeCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChangeValue = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleChangeSizeXValue = (event) => {
    console.log(event.target.name)
    var v = event.target.value
    if(state.sizeXY){
      if(event.target.name === "SizeXInit"){
        setState(function(prevState: any){return{...prevState,SizeXInit:v,SizeYInit:v}})
      }else if(event.target.name == "SizeXROC"){
        setState(function(prevState: any){return{...prevState,SizeXROC:v,SizeYROC:v}})
      }else if(event.target.name == "SizeXAcc"){
        setState(function(prevState: any){return{...prevState,SizeXAcc:v,SizeYAcc:v}})
      }
    }else{
      setState({ ...state, [event.target.name]: event.target.value });
    }
    
  };
  const handleChangeOffsetXValue = (event) => {
    console.log(event.target.name)
    var v = event.target.value
    if(state.OffsetXY){
      if(event.target.name === "OffsetXInit"){
        setState(function(prevState: any){return{...prevState,OffsetXInit:v,OffsetYInit:v}})
      }else if(event.target.name == "OffsetXROC"){
        setState(function(prevState: any){return{...prevState,OffsetXROC:v,OffsetYROC:v}})
      }else if(event.target.name == "OffsetXAcc"){
        setState(function(prevState: any){return{...prevState,OffsetXAcc:v,OffsetYAcc:v}})
      }
    }else{
      setState({ ...state, [event.target.name]: event.target.value });
    }
    
  };
  
  const handleChangeTab = (event,value) => {
    setState(function(prevState: any){return{...prevState,Tab:value}});
  };
  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

  return (
      <div>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          name="Tab"
          value={state.Tab}
          onChange={handleChangeTab}
          aria-label="nav tabs example"
        >
          <LinkTab label="Sprite Data" href="" {...a11yProps(0)} />
          <LinkTab label="Offset" href="" {...a11yProps(1)} />
          <LinkTab label="Size" href="" {...a11yProps(2)} />
          <LinkTab label="Angle" href="" {...a11yProps(3)} />
          <LinkTab label="Transparency" href="" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <div hidden={state.Tab != 0}>
          <fieldset style={{borderRadius:"10px",padding:"20px"}}>
            <legend>Animation Data</legend>
            <TextField
              required
              id="SpriteGroup"
              name="SpriteGroup"
              label="Sprite Group"
              value={state.SpriteGroup}
              onChange={handleChangeValue}
              style={{marginRight:"10px"}}
            />
            <TextField
              required
              id="SpriteIndexS"
              name="SpriteIndexS"
              label="Sprite Index"
              value={state.SpriteIndexS}
              onChange={handleChangeValue}
              style={{marginRight:"10px"}}
              InputProps={{
                startAdornment: <InputAdornment position="start">From</InputAdornment>,
              }}
            />
            
            <FormControl className={classes.withoutLabel}>
              <TextField
                required
                id="SpriteIndexE"
                name="SpriteIndexE"
                value={state.SpriteIndexE}
                onChange={handleChangeValue}
                style={{marginRight:"10px"}}
                InputProps={{
                  startAdornment: <InputAdornment position="start">To</InputAdornment>,
                }}
              />
            </FormControl>
            
            <TextField
              required
              id="Time"
              name="AnimTime"
              label="Time for each index"
              value={state.AnimTime}
              onChange={handleChangeValue}
            />
            <br/>
            <FormControl style={{minWidth: "120px"}}>
              <InputLabel shrink>
                Flip
              </InputLabel>
              <Select
                labelId="Flip-label"
                id="flip"
                name="Flip"
                value={state.Flip}
                onChange={handleChangeValue}
                style={{marginRight:"10px"}}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="H">H</MenuItem>
                <MenuItem value="V">V</MenuItem>
                <MenuItem value="HV">HV</MenuItem>
              </Select>
            </FormControl>
        </fieldset>
      </div>
      <div hidden={state.Tab != 1}>
        <fieldset style={{borderRadius:"10px",padding:"20px"}}>
            <legend>Offset</legend>
            <FormControlLabel
              control={<Checkbox checked={state.OffsetXY} onChange={handleChangeOffsetXY} name="OffsetXY" />}
              label="Copy data of offset X to offset Y"
            />
            <br/>
            <div>Size X</div>
            <TextField
              required
              id="OffsetXInit"
              name="OffsetXInit"
              label="Initial Offset"
              value={state.OffsetXInit}
              style={{marginRight:"10px"}}
              onChange={handleChangeOffsetXValue}
            />
            <TextField
              required
              id="OffsetXROC"
              name="OffsetXROC"
              label="Rate of Change"
              value={state.OffsetXROC}
              style={{marginRight:"10px"}}
              onChange={handleChangeOffsetXValue}
            />            
            <TextField
              required
              id="OffsetXAcc"
              name="OffsetXAcc"
              label="Accelation"
              value={state.OffsetXAcc}
              style={{marginRight:"10px"}}
              onChange={handleChangeOffsetXValue}
            />
            <br/>
            <div>Offset Y</div>
            <TextField
              required
              disabled={state.OffsetXY}
              id="OffsetYInit"
              name="OffsetYInit"
              label="Initial Offset"
              value={state.OffsetYInit}
              style={{marginRight:"10px"}}
              onChange={handleChangeValue}
            />
            <TextField
              required
              disabled={state.OffsetXY}
              id="OffsetYROC"
              name="OffsetYROC"
              label="Rate of Change"
              value={state.OffsetYROC}
              style={{marginRight:"10px"}}
              onChange={handleChangeValue}
            />            
            <TextField
              required
              disabled={state.OffsetXY}
              id="OffsetYAcc"
              name="OffsetYAcc"
              label="Accelation"
              value={state.OffsetYAcc}
              style={{marginRight:"10px"}}
              onChange={handleChangeValue}
            />
        </fieldset>
      </div>
      <div hidden={state.Tab != 2}>
        <fieldset style={{borderRadius:"10px",padding:"20px"}}>
            <legend>Size</legend>
            <FormControlLabel
              control={<Checkbox checked={state.sizeXY} onChange={handleChangeSizeXY} name="sizeXY" />}
              label="Copy data of size X to size Y"
            />
            <br/>
            <div>Size X</div>
            <TextField
              required
              id="SizeXInit"
              name="SizeXInit"
              label="Initial Size"
              value={state.SizeXInit}
              style={{marginRight:"10px"}}
              onChange={handleChangeSizeXValue}
            />
            <TextField
              required
              id="SizeXROC"
              name="SizeXROC"
              label="Rate of Change"
              value={state.SizeXROC}
              style={{marginRight:"10px"}}
              onChange={handleChangeSizeXValue}
            />            
            <TextField
              required
              id="SizeXAcc"
              name="SizeXAcc"
              label="Accelation"
              value={state.SizeXAcc}
              style={{marginRight:"10px"}}
              onChange={handleChangeSizeXValue}
            />
            <br/>
            <div>Size Y</div>
            <TextField
              required
              disabled={state.sizeXY}
              id="SizeYInit"
              name="SizeYInit"
              label="Initial Size"
              value={state.SizeYInit}
              style={{marginRight:"10px"}}
              onChange={handleChangeValue}
            />
            <TextField
              required
              disabled={state.sizeXY}
              id="SizeYROC"
              name="SizeYROC"
              label="Rate of Change"
              value={state.SizeYROC}
              style={{marginRight:"10px"}}
              onChange={handleChangeValue}
            />            
            <TextField
              required
              disabled={state.sizeXY}
              id="SizeYAcc"
              name="SizeYAcc"
              label="Accelation"
              value={state.SizeYAcc}
              style={{marginRight:"10px"}}
              onChange={handleChangeValue}
            />
        </fieldset>
      </div>
      <div hidden={state.Tab != 3}>
        <fieldset style={{borderRadius:"10px",padding:"20px"}}>
            <legend>Angle</legend>
            <TextField
              required
              id="AngleInit"
              name="AngleInit"
              label="Initial Angle"
              value={state.AngleInit}
              style={{marginRight:"10px"}}
              onChange={handleChangeValue}
            />
            <TextField
              required
              id="AngleROC"
              name="AngleROC"
              label="Rate of Change"
              value={state.AngleROC}
              style={{marginRight:"10px"}}
              onChange={handleChangeValue}
            />            
            <TextField
              required
              id="AngleAcc"
              name="AngleAcc"
              label="Accelation"
              value={state.AngleAcc}
              style={{marginRight:"10px"}}
              onChange={handleChangeValue}
            />
        </fieldset>
      </div>
      <div hidden={state.Tab != 4}>
        <fieldset style={{borderRadius:"10px",padding:"20px"}}>
            <legend>Transparency</legend>
            <FormControl style={{minWidth: "120px"}}>
              <InputLabel shrink>
                Trans
              </InputLabel>
              <Select
                labelId="trans-label"
                id="trans"
                name="Transparency"
                value={state.Transparency}
                onChange={handleChangeValue}
                style={{marginRight:"10px"}}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Add">Add</MenuItem>
                <MenuItem value="Sub">Sub</MenuItem>
              </Select>
            </FormControl>
            <div >
              <TextField
                required
                id="AlphaS"
                name="AlphaS"
                label="Alpha"
                value={state.AlphaS}
                hidden={state.Transparency=="Sub"}
                onChange={handleChangeValue}
                style={{marginRight:"10px"}}
                disabled={state.Transparency=="Sub"}
                InputProps={{
                  startAdornment: <InputAdornment position="start">AS</InputAdornment>,
                }}
              />
              <FormControl className={classes.withoutLabel}>
                <TextField
                  required
                  id="AlphaD"
                  name="AlphaD"
                  value={state.Transparency=="Add"?state.AlphaD:256-state.AlphaS}
                  hidden={state.Transparency=="Sub"}
                  onChange={handleChangeValue}
                  style={{marginRight:"10px"}}
                  disabled={state.Transparency!="Add"}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">D</InputAdornment>,
                  }}
                />
              </FormControl>
              <br/>
              <FormControlLabel
                hidden={state.Transparency=="Sub"}
                control={<Checkbox checked={state.FadeIn} disabled={state.Transparency=="Sub"} onChange={handleChangeCheckbox} name="FadeIn" />}
                label="Fade in"
              />
              <div>
                <TextField
                  required
                  id="FadeInTime"
                  name="FadeInTime"
                  label="Fade In Time"
                  value={state.FadeInTime}
                  hidden={state.Transparency=="Sub"}
                  onChange={handleChangeValue}
                  style={{marginRight:"10px"}}
                  disabled={state.Transparency=="Sub" || !state.FadeIn}
                />
              </div>
              <br/>
              <FormControlLabel
                hidden={state.Transparency=="Sub"}
                control={<Checkbox checked={state.FadeOut} disabled={state.Transparency=="Sub"} onChange={handleChangeCheckbox} name="FadeOut" />}
                label="Fade out"
              />
              <div>
                <TextField
                  required
                  id="FadeOutTime"
                  name="FadeOutTime"
                  label="Fade Out Time"
                  value={state.FadeOutTime}
                  hidden={state.Transparency=="Sub"}
                  onChange={handleChangeValue}
                  style={{marginRight:"10px"}}
                  disabled={state.Transparency=="Sub" || !state.FadeOut}
                />
              </div>
            </div>
        </fieldset>
      </div>
      <div style={{marginTop:"20px",marginBottom:"20px"}}>
        <Button variant="contained" color="primary" onClick={generateAir}>Generate Air</Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>Reset All</Button>
      </div>
      <div hidden={state.air==""} style={{width:"100%"}}>
        <p style={{fontSize:"20px",fontWeight:"bold"}}>Output</p>
        <p style={{minHeight: "200px",userSelect: "all",backgroundColor:"#D8D8D8",whiteSpace: "pre-line",padding:"15px",border:"solid",borderWidth:"1px",borderColor:"black"}} >{state.air}</p>
      </div>
    </div>
    
    )
}