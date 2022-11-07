import { Checkbox, Button, Spacer } from "@nextui-org/react";
import './CheckBoxGroup.css';

const CheckBoxGroup = () => {
    return (
        <div className='check-box-group'>
            <Checkbox.Group
                color="secondary"
                defaultValue={["buenos-aires"]}
                label="Select cities"
            >
                <Checkbox style={{ fontSize: '14px' }} value="buenos-aires">Buenos Aires</Checkbox>
                <Checkbox value="sydney">Sydney</Checkbox>
                <Checkbox value="london">London</Checkbox>
                <Checkbox value="tokyo">Tokyo</Checkbox>
            </Checkbox.Group>
            <Spacer y={1} />
            <Button className="check-box-group-button" bordered color="primary" auto>
                Load More
            </Button>
        </div>
    )
}

export default CheckBoxGroup;