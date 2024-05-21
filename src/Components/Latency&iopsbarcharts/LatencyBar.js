import React,{useState} from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LatencyBar = ({data}) => {
    // console.log(data);
    const [displayOption, setDisplayOption] = useState('combined'); 
  
    const handleDisplayOptionChange = (option) => {
      setDisplayOption(option); 
    };
   const renderCustomTooltip = (props) => {
      const { active, payload } = props;
      if (active && payload && payload.length) {
          const latencyPayload = payload.find(item => item.dataKey === 'latency');
          const dangerPayload = payload.find(item => item.dataKey === 'dangerLevel');
          const latencyValue = latencyPayload ? latencyPayload.value : 0;
          const dangerValue = dangerPayload ? dangerPayload.value : 0;
          const dangerDisplay = dangerValue > 0 ? `Danger 60%` : `Danger 0%`;
          return (
              <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                  <p>{`${payload[0].payload.name}`}</p>
                  <p>{`Latency: ${latencyValue}`}</p>
                  <p>{` ${dangerDisplay}`}</p>
              </div>
          );
      }
      return null;
  };
  return (
    <div>
      <div className='d-flex justify-content-center' style={{marginBottom:'20px'}}>
        <button onClick={() => handleDisplayOptionChange('combined')}  style={{backgroundColor:'#e3dfdc',color:'black',borderColor:'white',borderStyle:'solid',borderRadius:'10px',marginRight:'5px'}}>OverAll Perfomance</button>
        <button onClick={() => handleDisplayOptionChange('latency')}  style={{backgroundColor:'#e3dfdc',color:'#338ede',borderColor:'white',borderStyle:'solid',borderRadius:'10px',marginRight:'5px'}}>Latency Level</button>
        <button onClick={() => handleDisplayOptionChange('danger')} style={{backgroundColor:'#e3dfdc',color:'red',borderColor:'white',borderStyle:'solid',borderRadius:'10px'}}>Danger Level</button>
      </div>
      <ResponsiveContainer width="90%" height={500}>
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
          <Tooltip content={renderCustomTooltip}  />
          <Legend />
          {displayOption === 'latency' && <Bar dataKey="latency" stackId="latStack" fill="lightblue" />}
          {displayOption === 'danger' && <Bar dataKey="dangerLevel" stackId="latStack" fill="red" />}
          
          {/* {data.map((value)=>{value.dangerLevel>0?<Bar dataKey="dangerLevel" stackId="latStack" fill="red" />: <Bar dataKey="latency" stackId="latStack" fill="lightblue" /> } */}
          {displayOption === 'combined' && (
            <>
              <Bar dataKey="latency" stackId="latStack" fill="lightblue" />
              <Bar dataKey="dangerLevel" stackId="latStack" fill="red" />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LatencyBar
