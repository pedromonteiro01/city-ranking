import { Dropdown, Container } from "@nextui-org/react";
import React from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './FiltersBox.css';

const FiltersBox = () => {

    const animatedComponents = makeAnimated();

    const options = [
        { value: 'health', label: 'Health Care' },
        { value: 'criminal', label: 'Criminal Rate' },
        { value: 'pollution', label: 'Pollution' }
    ]

    return (
        <Container className='filters-box'>
            <Select
                className="side-bar-dropdown"
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[options[0]]}
                isMulti
                styles={{menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                options={options}
            />
        </Container>
    )
}

export default FiltersBox;