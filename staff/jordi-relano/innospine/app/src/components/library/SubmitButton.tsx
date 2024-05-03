//@ts-nocheck

import RoundButton from './RoundButton'


function SubmitButton(props) {
    return <RoundButton className="bg-[#83d3f5]" type="submit">{props.children || 'Submit'}</RoundButton>
}

export default SubmitButton