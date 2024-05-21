import React,{useState} from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const IopsBarchart = ({data}) => {
    const [displayOption, setDisplayOption] = useState('combined'); // Initially set to 'combined' to show combined data

  const handleDisplayOptionChange = (option) => {
    setDisplayOption(option); // Set the display option
  };


  const renderCustomTooltip = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
        const iopsPayload = payload.find(item => item.dataKey === 'IOPS_Data');
        const dangerPayload = payload.find(item => item.dataKey === 'dangerLevel');
        const iopsValue = iopsPayload ? iopsPayload.value : 0;
        const dangerValue = dangerPayload ? dangerPayload.value : 0;
        const dangerDisplay = dangerValue > 0 ? `Danger 60%` : `Danger 0%`;
        return (
            <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                <p>{`${payload[0].payload.name}`}</p>
                <p>{`IOPS: ${iopsValue}`}</p>
                <p>{` ${dangerDisplay}`}</p>
            </div>
        );
    }
    return null;
};
  return (
    <div>
      <div className='d-flex justify-content-center' style={{marginBottom:'20px'}}>
        <button onClick={() => handleDisplayOptionChange('combined')}  style={{backgroundColor:'#e3dfdc',color:'white',borderColor:'white',borderStyle:'solid',borderRadius:'10px',marginRight:'5px'}}>OverAll Perfomance</button>
        <button onClick={() => handleDisplayOptionChange('iops')} style={{backgroundColor:'#e3dfdc',color:'#338ede',borderColor:'white',borderStyle:'solid',borderRadius:'10px',marginRight:'5px'}}>IOPS Level</button>
        <button onClick={() => handleDisplayOptionChange('danger')} style={{backgroundColor:'#e3dfdc',color:'red',borderColor:'white',borderStyle:'solid',borderRadius:'10px'}}>Danger Level</button>
      </div>
      <ResponsiveContainer width="80%" height={500}>
        <BarChart
          layout="vertical"
          width={800}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip content={renderCustomTooltip}/>
          <Legend />
          {displayOption === 'iops' && <Bar dataKey="IOPS_Data" stackId="iopsStack" fill="lightgreen" />}
          {displayOption === 'danger' && <Bar dataKey="dangerLevel" stackId="iopsStack" fill="red" />}
          {displayOption === 'combined' && (
            <>
              <Bar dataKey="IOPS_Data" stackId="iopsStack" fill="lightgreen" />
              <Bar dataKey="dangerLevel" stackId="iopsStack" fill="red" />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default IopsBarchart

