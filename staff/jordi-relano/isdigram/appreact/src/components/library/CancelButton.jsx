import RoundButton from './RoundButton'




// import './CancelButton.sass'




function CancelButton(props) {

    return <RoundButton className="{`rounded-[5px] border-[1px] border-black my-[10px] ${props.className}`" onClick={props.onClick}>{props.children || 'Cancel'}</RoundButton>

}




export default CancelButton