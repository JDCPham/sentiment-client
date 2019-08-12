var options = {
    type:"gauge",
    globals:{
       fontSize:10
    },
    plotarea:{
       marginTop:40
    },
    plot:{
       size:'100%',
 
    },
    tooltip:{
       borderRadius:0
    },
    scaleR:{
       aperture:180,
       minValue:-1,
       maxValue:1,
       step:0.1,
       center:{
          visible:false
       },
       tick:{
          visible:false
       },
       item:{
          offsetR:0,
          angle:"auto"
       },
       labels:[
          '-1'
       ],
       ring:{
          size:15,
          rules:[
             {
                rule:'%v >= -1 && %v < -0.6',
                backgroundColor:'#e32d2d'
             },
             {
                rule:'%v >= -0.6 && %v < -0.2',
                backgroundColor:'#e3702d'
             },
             {
                rule:'%v >= -0.2 && %v < 0.2',
                backgroundColor:'#edea53'
             },
             {
                rule:'%v >= 0.2 && %v < 0.6',
                backgroundColor:'#87c949'
             },
             {
                rule:'%v >= 0.6 && %v < 1.0',
                backgroundColor:'#28992b'
             }
          ]
       }
    },
    gui: {
       contextMenu: {
          empty: true
       }
    },
    refresh:{  
        type:"feed",
        transport:"js",
        url:"update()",
        interval: 1000
    },
    series:[
       {
          values:[],
          backgroundColor:'black',
          csize:"8%",
          size:"100%",
          animation:{
             effect:2,
             method:5,
             sequence:2,
             speed:4000
          },
 
       }
    ]
 };