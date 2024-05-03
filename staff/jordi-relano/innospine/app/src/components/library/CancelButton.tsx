//@ts-nocheck

import RoundButton from './RoundButton'


function CancelButton(props) {
    return <RoundButton className="bg-[#83d3f5]" onClick={props.onClick}>{props.children || 'Cancel'}</RoundButton>
}

export default CancelButton