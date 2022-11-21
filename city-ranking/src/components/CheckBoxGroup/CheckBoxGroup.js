import { Checkbox, Button, Spacer } from "@nextui-org/react";
import { useState } from "react";
import './CheckBoxGroup.css';

const CheckBoxGroup = () => {

    const [showItems, setShowItems] = useState(false);

    const handleShowMoreItems = () => {
        setShowItems(!showItems);
    }

    return (
        <div className='check-box-group'>
            <Checkbox.Group
                color="secondary"
                defaultValue={["buenos-aires"]}
                label="Select cities"
            >
                <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
                <Checkbox value="sydney">Sydney</Checkbox>
                <Checkbox value="london">London</Checkbox>
                <Checkbox value="tokyo">Tokyo</Checkbox>
                {
                    showItems &&
                    <>
                        <Checkbox value="sydney">Sydney</Checkbox>
                        <Checkbox value="london">London</Checkbox>
                        <Checkbox value="tokyo">Tokyo</Checkbox>
                        <Checkbox value="sydney">Sydney</Checkbox>
                        <Checkbox value="london">London</Checkbox>
                        <Checkbox value="tokyo">Tokyo</Checkbox>
                        <Checkbox value="sydney">Sydney</Checkbox>
                        <Checkbox value="london">London</Checkbox>
                        <Checkbox value="tokyo">Tokyo</Checkbox>
                        <Checkbox value="sydney">Sydney</Checkbox>
                        <Checkbox value="london">London</Checkbox>
                        <Checkbox value="tokyo">Tokyo</Checkbox>
                        <Checkbox value="sydney">Sydney</Checkbox>
                        <Checkbox value="london">London</Checkbox>
                        <Checkbox value="tokyo">Tokyo</Checkbox>
                    </>
                }
            </Checkbox.Group>
            <Spacer y={1} />
            {
                !showItems &&
                <Button onClick={handleShowMoreItems} className="check-box-group-button" bordered color="primary" auto>
                    Load More
                </Button>
            }
            {
                showItems &&
                <Button onClick={handleShowMoreItems} className="check-box-group-button" bordered color="primary" auto>
                    Load Less
                </Button>
            }
        </div>
    )
}

export default CheckBoxGroup;