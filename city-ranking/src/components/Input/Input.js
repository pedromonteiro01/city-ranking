import { Input, Spacer } from "@nextui-org/react";
import './Input.css';

const NextInput = () => {
    return (
        <div className="input-wrapper">
            <Spacer y={2.5} />
            <Input
                clearable
                underlined
                labelPlaceholder="City"
                initialValue=""
            />
            <Spacer y={1.5} />
        </div>
    )
}

export default NextInput;