import { Dropdown, Container } from "@nextui-org/react";
import React from "react";
import './FiltersBox.css';

const FiltersBox = () => {
    
    const [selected, setSelected] = React.useState(new Set(["health_care"]));

    const selectedValue = React.useMemo(
      () => Array.from(selected).join("\r\n").replaceAll("_", " "),
      [selected]
    );
    
    return (
        <Container className='filters-box'>
            <Dropdown className="side-bar-dropdown">
                <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }} className="side-bar-dropdown">
                    {selectedValue}
                </Dropdown.Button>
                <Dropdown.Menu
                    aria-label="Multiple selection actions"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="multiple"
                    selectedKeys={selected}
                    onSelectionChange={setSelected}
                >
                    <Dropdown.Item key="health_care">Health Care</Dropdown.Item>
                    <Dropdown.Item key="pollution">Pollution</Dropdown.Item>
                    <Dropdown.Item key="criminal">Criminal Rate</Dropdown.Item>
                    <Dropdown.Item key="ranking">Ranking</Dropdown.Item>    
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    )
}

export default FiltersBox;