//@ts-nocheck

import RoundButton from './RoundButton'


function SubmitButton(props) {
    return <RoundButton className="bg-[#00e5ff]" type="submit">{props.children || 'Submit'}</RoundButton>
}

export default SubmitButton