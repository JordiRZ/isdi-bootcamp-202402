//@ts-nocheck

import RoundButton from './RoundButton'


function CancelButton(props) {
    return <RoundButton className="bg-[#00e5ff] cancel-button" onClick={props.onClick}>{props.children || 'Cancel'}</RoundButton>
}

export default CancelButton