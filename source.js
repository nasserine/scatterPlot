function scatterPlot(){

    // set the dimensions and margins of the graph
     var margin = {top: 30, right: 10, bottom: 160, left: 10},
         width = 880 - margin.left - margin.right,
         height = 580 - margin.top - margin.bottom;
       //  legendCellSize = 20;
  
  

  
    function chart(selection){
     
      selection.each(function(data) {
      
        var svg = d3.select(this);
       
        svg 
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
          
         
        
  

        
    //Read the data flags

    var promises = [];
    promises.push(d3.csv("data/flags.csv")); 
    promises.push(d3.csv("data/continent.csv")); 
  

    
    Promise.all(promises).then(function(values) {
     
    
         const data2 = values[0];
         const data3= values[1];
         // Color scale used

         console.log(data3)
       
        var flags = d3.map();
        var flags2 = d3.map();

        var continent = ["Africa","Asia","Europe","North America","Oceania","South America"]
        
        //d3.map(data3, function(d){return d.Continent;}).keys();
      
        console.log(continent)
   
        data2.forEach( function(e) {
        
                flags.set(e.country, e.image); 
               
         });

         data3.forEach( function(d) {
        
          flags2.set(d.Country, d.Continent); 
   });

   console.log(flags2)
   
        
        var x =  d3.scaleLinear()
                  .domain(d3.extent(data.$data, function(d) { return +d[3]; }))
                  .range([0,width-50]);
    

        var y =  d3.scaleLinear()
                        .domain(d3.extent(data.$data, function(d) { return +d[4]; }))
                        .range([height+50,-10]);



       var colorScale = d3.scaleThreshold()
                        .domain(continent)
                        .range(["#8c510a","#d8b365","#f6e8c3","#c7eae5","#5ab4ac","#01665e"]);

       
        // Add X axis 
            svg.append("g")
             //  .attr("transform", "translate(90," + 410+ ")")
             .attr("transform", "translate(100," + 530+ ")")
 
               .attr("class", "axis x-axis")
               .call(d3.axisBottom(x) );


           // Add Y axis 
            svg.append("g")   
              // .attr("transform", "translate(" + 100 + ",10)")
              .attr("transform", "translate(" + 100 + ",80)")
               .attr("class", "axis y-axis")
               .call(d3.axisLeft(y) .ticks(10));

      
            // Add X axis label:
             svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", 560)
                .attr("y", height+180 )
                .text("Population Density");


            // Add Y axis label:
            svg.append("text")
               .attr("transform", "rotate(90)")
               .attr("x", 200)
               .attr("y", -35)
              
               .text("Population Growth %")
               .attr("text-anchor", "start")

        
        var r = d3.scaleLinear()
                  .domain(d3.extent(data.$data, function(d) { return +d[2]; }))
                  .range([10, 40]);

     
        
       var g= svg

        .append("g")   
            //.attr("transform", "translate(" + 90 + ",180)")
            .attr("transform", "translate(150," + (80) + ")");
        
        g.selectAll("circles")
           .data(data.$data)
           .enter()
           .append("circle")
           .attr("class", "circles")
          // .style("fill","#b76e79")
         
           .attr("opacity",0.9)
           .attr("cx", function (d) { return x(+d[3]); })
           .attr("cy", function (d) { return y(+d[4]); })
           .attr("r", function (d) { return r(d[2]); })
          // .style("fill","url(https://upload.wikimedia.org/wikipedia/commons/c/cd/Flag_of_Afghanistan_%282013%E2%80%932021%29.svg)")   
           //.attr("fill", "https://upload.wikimedia.org/wikipedia/commons/c/cd/Flag_of_Afghanistan_%282013%E2%80%932021%29.svg")
         
           .style("fill", function (d) { 
           
            var cont=flags2.get(d[0])
            
          return colorScale(cont) 
        })
        .append("title")
        .text(function(d) {return d[0]+": "+ d[1]; });

         
        
        


 //////////
    // LEGEND //
    //////////

    // Add one dot in the legend for each name.
    var size = 5

    var subgroups = data.columns.slice(1)
    // color palette = one color per subgroup
   var color = d3.scaleOrdinal()
     .domain(subgroups)
     .range([ "red", "blue","green"]);
 
 
 svg.selectAll("myline")
    .data(continent)
     .enter()
     .append("circle")
    .attr("cx",function(d,i){ return  65+i*(size+140)})
   .attr("cy", 16) // 565 is where the first dot appears. 25 is the distance between 
    .attr("r", 4)
  .style("fill", function(d){ return colorScale(d)})
 
 
 
 // Add one dot in the legend for each name.
     svg.selectAll("myline")
       .data(continent)
       .enter()
       .append("text")
         .attr("x", function(d,i){ return  70+i*(size+145)})
         .attr("y",17) //570
         .style("fill", function(d){ return colorScale(d)})
         .text(function(d){ return d})
         .attr("text-anchor", "left")
 
 
           
             //.style("fill","url(https://upload.wikimedia.org/wikipedia/commons/c/cd/Flag_of_Afghanistan_%282013%E2%80%932021%29.svg)")   
     
       // .attr("xlink:href","https://upload.wikimedia.org/wikipedia/commons/c/cd/Flag_of_Afghanistan_%282013%E2%80%932021%29.svg")   
       
       
           
    })
 

});




}


return chart;

}
