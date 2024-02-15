const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function chartsFunction(sample_info) {
  d3.json(url).then((data) => {
        const numberofSamples = data.samples;

        const selectedSample = numberofSamples.filter(sample => sample.id == sample_info);
        const firstSample = selectedSample[0];
        
        const otuIDs = firstSample.otu_ids.slice(0, 10);
        const otuLabels = firstSample.otu_labels.slice(0, 10);
        const sampleValues = firstSample.sample_values.slice(0, 10);

        let trace = {
          x: sampleValues,
          y: otuIDs.map(id => `OTU ${id}`),
          text: otuLabels,
          type: "bar",
          orientation: 'h'
        };
        let layout = {
          yaxis: {
            autorange: "reversed"
          }
        };
        Plotly.newPlot("bar", [trace], layout);
        
        
        let traceBubble = {
          x: firstSample.otu_ids,
          y: firstSample.sample_values,
          text: firstSample.otu_labels,
          mode: 'markers',
          marker: {
            size: firstSample.sample_values,
            color: firstSample.otu_ids,
          }
        };

        let layoutBubble = {
          xaxis: { title: 'OTU ID' },
          yaxis: { title: 'Sample Values' },
          showlegend: false
        };

        Plotly.newPlot("bubble", [traceBubble], layoutBubble);
      });
      
      }
        

      
function init(){
  d3.json(url).then((data) => {
    let sampleNames = data.names;
    let firstname = sampleNames[0];

    chartsFunction(firstname);
});
  }
init();