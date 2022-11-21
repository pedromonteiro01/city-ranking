import './ChartOption.css';

const ChartOption = (props) => {
    return (
        <div className='chart-option-wrapper'>
        <div className='chart-option'>
            <img src={props.image} alt="line chart" />
        </div>
        <p>{props.desc}</p>
        </div>
    )
}

export default ChartOption;