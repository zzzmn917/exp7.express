const express = require('express')
const app = express()
app.listen(8000,()=>{
    console.log('Listening on port 8000...')
})

app.get('/',(req,res)=>{
    res.send('Hello Internet of Things.')
})

const sensors = [
    {id: 1,name:'温度传感器'},
    {id: 2,name:'湿度传感器'},
    {id: 3,name:'压力传感器'},
    {id: 4,name:'电压传感器'},
    {id: 5,name:'电流传感器'},
    {id: 6,name:'扭矩传感器'},
]

app.get('/api/sensors',(req,res)=>{
    res.send(sensors)
})

app.get('/api/sensors/:id',(req,res)=>{
    const sensor = sensors.find(c =>c.id === parseInt(req.params.id))
    if(!sensor){
        res.status(404).send("The sensor not found")
    }
    res.send(sensor)
})

app.use(express.json());
// 提交一个传感器信息
app.post('/api/sensors', (req, res) => {
//在提交前，对传感器名进行校验，若传感器名为空或者小于4个字符，则返回
if (!req.body.name || req.body.name.length < 2) {
// 400 Bad Request
   res.status(400).send('Name is required and should be minimum 4 characters.');
   return;
}
// 创建一个传感器对象
const sensor = {
id: sensors.length + 1,
name: req.body.name
};
// 向传感器列表数组中添加一个新项
sensors.push(sensor);
res.send(sensor);
});